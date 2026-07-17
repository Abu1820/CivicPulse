package com.civicpulse.backend.service;
import com.civicpulse.backend.dto.DashboardStats;
import java.util.List;

import org.springframework.stereotype.Service;

import com.civicpulse.backend.dto.IssueRequest;
import com.civicpulse.backend.entity.Issue;
import com.civicpulse.backend.repository.IssueRepository;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Issue createIssue(IssueRequest request) {

        Issue issue = new Issue();

        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setLocation(request.getLocation());
        issue.setCategory(request.getCategory());
        issue.setStatus("Pending");

        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }
    public Issue updateStatus(Long id, String status) {

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setStatus(status);

        return issueRepository.save(issue);
    }
    public Issue getIssueById(Long id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
    }
    public void deleteIssue(Long id) {

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issueRepository.delete(issue);
    }
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
}