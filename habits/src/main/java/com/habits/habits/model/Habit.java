package com.habits.habits.model;

import jakarta.persistence.*;

@Entity
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    public Habit() {}

    public Habit(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // Getters and setters
    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
