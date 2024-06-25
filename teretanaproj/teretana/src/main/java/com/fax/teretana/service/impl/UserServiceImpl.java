package com.fax.teretana.service.impl;

import com.fax.teretana.model.User;
import com.fax.teretana.repository.UserRepository;
import com.fax.teretana.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
