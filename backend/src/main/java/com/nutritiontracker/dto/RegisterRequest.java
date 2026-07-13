package com.nutritiontracker.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Size(min = 3, max = 20) private String username;
    @Email @NotBlank                   private String email;
    @NotBlank @Size(min = 6)           private String password;
    private Double dailyCalorieGoal;
}
//package com.nutritiontracker.dto;
//
//public class RegisterRequest {
//    private String username;
//    private String password;
//    private String email;
//
//    public String getUsername() { return username; }
//    public void setUsername(String username) { this.username = username; }
//
//    public String getPassword() { return password; }
//    public void setPassword(String password) { this.password = password; }
//
//    public String getEmail() { return email; }
//    public void setEmail(String email) { this.email = email; }
//}