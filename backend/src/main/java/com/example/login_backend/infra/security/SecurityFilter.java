package com.example.login_backend.infra.security;

import com.example.login_backend.domain.user.User;
import com.example.login_backend.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.util.Collections;


@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("entrei no filtrum");
        var token = this.recoverToken(req);

        // Só tenta validar se houver um token
        if (token != null) {
            try {
                var login = tokenService.validateToken(token);

                if (login != null && !login.isEmpty()) {
                    userRepository.findByEmail(login).ifPresent(user -> {
                        var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
                        var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    });
                }
            } catch (Exception e) {
                // Se o token for inválido, apenas logamos e deixamos seguir
                // O SecurityFilterChain decidirá se bloqueia (anyRequest.authenticated)
                // ou libera (permitAll)
                System.out.println("Token inválido ou expirado: " + e.getMessage());
            }
        }

        // Esta linha DEVE ser a última e estar fora de qualquer bloco condicional
        filterChain.doFilter(req, res);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }


}
