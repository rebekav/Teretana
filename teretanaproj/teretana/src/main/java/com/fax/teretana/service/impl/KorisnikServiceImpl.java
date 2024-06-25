package com.fax.teretana.service.impl;

import com.fax.teretana.dto.*;
import com.fax.teretana.model.User;
import com.fax.teretana.repository.UserRepository;
import com.fax.teretana.security.SecurityConfiguration;
import com.fax.teretana.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

@Service
public class KorisnikServiceImpl implements KorisnikService {

    @Autowired
    UserRepository userRepository;


    @Autowired
    SecurityConfiguration configuration;


    @Override
    public String register(KorisnikDtoReq korisnikDto) throws Exception {
        User user = userRepository.findByEmail(korisnikDto.getEmail());
        if (user != null) {
            throw new Exception("Korisnik vec postoji");
        }
        user = new User();
        user.setAdresa(korisnikDto.getAdresa());
        user.setEmail(korisnikDto.getEmail());
        user.setIme(korisnikDto.getIme());
        user.setPrezime(korisnikDto.getPrezime());
        user.setTelefon(korisnikDto.getTelefon());
        user.setPass(configuration.passwordEncoder().encode(korisnikDto.getPass()));
        userRepository.save(user);
        return "Success";
    }




    @Override
    public KorisnikDtoRes getMyProfile(Integer id, String name) throws Exception {
        User user = userRepository.findByEmail(name);
        if (user == null) {
            throw new Exception("Korisnik ne postoji");
        }
        if (id != null) {
            user = userRepository.findById(id).get();
        }
        KorisnikDtoRes tmp = new KorisnikDtoRes();
        tmp.setId(user.getId());
        tmp.setEmail(user.getEmail());
        tmp.setIme(user.getIme());
        tmp.setPass(user.getPass());
        tmp.setPrezime(user.getPrezime());
        tmp.setTelefon(user.getTelefon());
        tmp.setAdresa(user.getAdresa());

        return tmp;
    }

}
