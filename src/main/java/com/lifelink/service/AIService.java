package com.lifelink.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final WebClient.Builder webClientBuilder;

    public String chat(String userMessage) {

        String body = """
        {
          "model":"llama-3.3-70b-versatile",
          "messages":[
            {
              "role":"system",
              "content":"You are LifeLink AI. Help users with blood donation, health, emergency blood requests and general questions."
            },
            {
              "role":"user",
              "content":"%s"
            }
          ]
        }
        """.formatted(userMessage);

        try {
            String response = webClientBuilder.build()
                    .post()
                    .uri("https://api.groq.com/openai/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            return root
                    .get("choices")
                    .get(0)
                    .get("message")
                    .get("content")
                    .asText();
        } catch (Exception e) {
            return "Sorry, AI service is currently unavailable.";
        }
    }
}
