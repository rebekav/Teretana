package com.fax.teretana.controller;

import com.fax.teretana.dto.SimpleStringResponseDTO;
import com.fax.teretana.dto.TreningDTOReq;
import com.fax.teretana.dto.TreningDTORes;
import com.fax.teretana.service.TreningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/trening")
public class TreningController {

    @Autowired
    TreningService treningService;

    @GetMapping("/istorijaTreninga")
    @PreAuthorize("hasAuthority('KORISNIK')")
    public ResponseEntity<?> istorijaTreninga(Principal principal) {
        try {
            List<TreningDTORes> treninzi = treningService.istorijaTreninga(principal.getName());
            return new ResponseEntity<>(treninzi, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new SimpleStringResponseDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/beleziTrening")
    @PreAuthorize("hasAuthority('KORISNIK')")
    public ResponseEntity<?> beleziTrening(@RequestBody TreningDTOReq treningDTOReq, Principal principal) {
        try {
            String poruka = treningService.beleziTrening(treningDTOReq, principal.getName());
            return new ResponseEntity<>(new SimpleStringResponseDTO(poruka), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new SimpleStringResponseDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/remove/{id}")
    @PreAuthorize("hasAuthority('KORISNIK')")
    public ResponseEntity<?> remove(@PathVariable("id") int id, Principal principal) {
        try {
            String poruka = treningService.remove(id, principal.getName());
            return new ResponseEntity<>(new SimpleStringResponseDTO(poruka), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new SimpleStringResponseDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/dashboard/{month}/{year}")
    @PreAuthorize("hasAuthority('KORISNIK')")
    public ResponseEntity<?> dashboard(@PathVariable("month") int month,@PathVariable("year") int year, Principal principal) {
        try {
            Map<Integer, Map<String, Object>> statistika = treningService.dashboard(month,year, principal.getName());
            return new ResponseEntity<>(statistika, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new SimpleStringResponseDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
