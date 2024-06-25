package com.fax.teretana.service;

import com.fax.teretana.model.User;

public interface UserService {
    User findByEmail(String username);

}
