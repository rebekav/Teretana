package com.fax.teretana.service;

import com.fax.teretana.dto.*;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

public interface KorisnikService {

    KorisnikDtoRes getMyProfile(Integer id, String name) throws Exception;

    String register(KorisnikDtoReq korisnikDto) throws Exception;
}
