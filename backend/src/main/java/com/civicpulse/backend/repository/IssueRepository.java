package com.civicpulse.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.civicpulse.backend.entity.Issue;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    long countByStatus(String status);

}