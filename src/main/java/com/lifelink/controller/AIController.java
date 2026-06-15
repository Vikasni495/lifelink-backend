package com.lifelink.controller;

import com.lifelink.dto.ChatRequest;
import com.lifelink.dto.ChatResponse;
import com.lifelink.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String answer = aiService.chat(request.getMessage());
        return new ChatResponse(answer);
    }
}
