package com.habits.habits.model;

import jakarta.persistence.*;

@Entity
@Table(name = "habits") // Explicit table name for clarity
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Required title
    private String title;

    @Column(length = 1000) // Allow longer descriptions
    private String description;

    // Constructors
    public Habit() {}

    public Habit(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    // Setters
    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
