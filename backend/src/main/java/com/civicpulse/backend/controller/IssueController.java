package com.civicpulse.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.civicpulse.backend.dto.IssueRequest;
import com.civicpulse.backend.entity.Issue;
import com.civicpulse.backend.service.IssueService;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping
    public Issue createIssue(@RequestBody IssueRequest request) {
        return issueService.createIssue(request);
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }
    @PutMapping("/{id}/status")
    public Issue updateStatus(@PathVariable Long id,
                              @RequestParam String status) {

        return issueService.updateStatus(id, status);
    }
    @GetMapping("/{id}")
    public Issue getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteIssue(@PathVariable Long id) {

        issueService.deleteIssue(id);

        return "Issue deleted successfully";
    }
}