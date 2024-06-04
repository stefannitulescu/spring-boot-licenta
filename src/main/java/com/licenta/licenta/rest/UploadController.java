package com.licenta.licenta.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/upload")
@CrossOrigin(origins = "http://localhost:3000")
public class UploadController {

    private static final String UPLOAD_DIR = "src/main/resources/react-frontend/public/";

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("imageFile") MultipartFile file) {
        try {
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.createDirectories(path.getParent()); // Ensure the directory exists
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            String imageUrl = file.getOriginalFilename();
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }
}
