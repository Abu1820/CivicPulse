package com.civicpulse.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.civicpulse.backend.dto.DashboardStats;
import com.civicpulse.backend.dto.IssueRequest;
import com.civicpulse.backend.entity.Issue;
import com.civicpulse.backend.repository.IssueRepository;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    // Create a new issue
    public Issue createIssue(IssueRequest request) {

        Issue issue = new Issue();

        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setLocation(request.getLocation());
        issue.setCategory(request.getCategory());
        issue.setStatus("Pending");

        return issueRepository.save(issue);
    }

    // Get all issues
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    // Get issue by ID
    public Issue getIssueById(Long id) {
        return findIssue(id);
    }

    // Update issue details
    public Issue updateIssue(Long id, IssueRequest request) {

        Issue issue = findIssue(id);

        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setLocation(request.getLocation());
        issue.setCategory(request.getCategory());

        return issueRepository.save(issue);
    }

    // Update issue status
    public Issue updateStatus(Long id, String status) {

        Issue issue = findIssue(id);

        issue.setStatus(status);

        return issueRepository.save(issue);
    }

    // Delete issue
    public void deleteIssue(Long id) {

        Issue issue = findIssue(id);

        issueRepository.delete(issue);
    }

    // Dashboard statistics
    public DashboardStats getDashboardStats() {

        long total = issueRepository.count();
        long pending = issueRepository.countByStatus("Pending");
        long inProgress = issueRepository.countByStatus("In Progress");
        long resolved = issueRepository.countByStatus("Resolved");

        return new DashboardStats(
                total,
                pending,
                inProgress,
                resolved
        );
    }

    // Helper method to find an issue
    private Issue findIssue(Long id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
    }
}