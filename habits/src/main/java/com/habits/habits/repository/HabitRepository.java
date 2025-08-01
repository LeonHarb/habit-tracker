package com.habits.habits.repository;

import com.habits.habits.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findByUserId(Long userId);  // ✅ Custom query to fetch habits by user
}
