package com.achados.controller;

import com.achados.model.User;
import com.achados.model.UserRole;
import com.achados.security.JwtTokenProvider;
import com.achados.service.EmailService;
import com.achados.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${google.client.id}")
    private String googleClientId;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            User user = userService.registerUser(
                request.get("name"),
                request.get("email"),
                request.get("password"),
                UserRole.valueOf(request.getOrDefault("role", "USER"))
            );

            String token = jwtTokenProvider.generateToken(user.getEmail());
            return ResponseEntity.ok(Map.of(
                "user", user,
                "token", token
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.get("email"),
                    request.get("password")
                )
            );

            User user = userService.findByEmail(request.get("email"));
            String token = jwtTokenProvider.generateToken(user.getEmail());

            return ResponseEntity.ok(Map.of(
                "user", user,
                "token", token
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email ou senha inválidos"));
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        try {
            String accessToken = request.get("access_token");
            GoogleIdToken idToken = verifyGoogleToken(accessToken);
            
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                
                User user = userService.registerGoogleUser(
                    (String) payload.get("name"),
                    payload.getEmail(),
                    payload.getSubject()
                );

                String token = jwtTokenProvider.generateToken(user.getEmail());
                return ResponseEntity.ok(Map.of(
                    "user", user,
                    "token", token
                ));
            }
            
            return ResponseEntity.badRequest().body(Map.of("message", "Token do Google inválido"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            userService.initiatePasswordReset(request.get("email"));
            return ResponseEntity.ok(Map.of("message", "Email de redefinição de senha enviado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            userService.resetPassword(
                request.get("token"),
                request.get("password")
            );
            return ResponseEntity.ok(Map.of("message", "Senha redefinida com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> request) {
        try {
            emailService.sendEmail(
                request.get("to"),
                request.get("subject"),
                request.get("message")
            );
            return ResponseEntity.ok(Map.of("message", "Email enviado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    private GoogleIdToken verifyGoogleToken(String accessToken) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

            return verifier.verify(accessToken);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao verificar token do Google: " + e.getMessage());
        }
    }
} 