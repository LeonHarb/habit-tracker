package com.habits.habits.controller;

import com.habits.habits.model.Habit;
import com.habits.habits.model.User;
import com.habits.habits.repository.HabitRepository;
import com.habits.habits.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*") // Allow all frontend origins
public class HabitController {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all habits
    @GetMapping
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    // Get habits by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Habit>> getHabitsByUserId(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Habit> userHabits = habitRepository.findByUserId(userId);
        return ResponseEntity.ok(userHabits);
    }

    // Get habit by ID
    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabitById(@PathVariable Long id) {
        Optional<Habit> habit = habitRepository.findById(id);
        return habit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create habit for a specific user
    @PostMapping("/user/{userId}")
    public ResponseEntity<Habit> createHabit(@PathVariable Long userId, @RequestBody Habit habit) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        habit.setUser(user.get());
        Habit savedHabit = habitRepository.save(habit);
        return ResponseEntity.ok(savedHabit);
    }

    // Update habit
    @PutMapping("/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable Long id, @RequestBody Habit habitDetails) {
        Optional<Habit> optionalHabit = habitRepository.findById(id);
        if (optionalHabit.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Habit habit = optionalHabit.get();
        habit.setTitle(habitDetails.getTitle());
        habit.setDescription(habitDetails.getDescription());

        Habit updatedHabit = habitRepository.save(habit);
        return ResponseEntity.ok(updatedHabit);
    }

    // Delete habit
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id) {
        if (!habitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        habitRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
