package com.users.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private userRepository repository;

    public List<User> getAllUsers(){
        return repository.findAll();
    }

     public User getUserById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public User addUser(User user){
        return repository.save(user);
    }

    public User updateUser(Integer id, User user){
        User  existingUser = repository.findById(id).orElse(null);

        if(existingUser != null){
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setContact(user.getContact());
             return repository.save(existingUser);
        }
         return null;

    }

    public String deleteUser(Integer id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return "User Deleted Successfully";
        }
        return "User Not Found";
    }
  

    
    
}
