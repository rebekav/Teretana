package com.fax.teretana.service.impl;

import com.fax.teretana.dto.TreningDTOReq;
import com.fax.teretana.dto.TreningDTORes;
import com.fax.teretana.model.Trening;
import com.fax.teretana.model.User;
import com.fax.teretana.repository.TreningRepository;
import com.fax.teretana.repository.UserRepository;
import com.fax.teretana.service.TreningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TreningServiceImpl implements TreningService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TreningRepository treningRepository;


    @Override
    public List<TreningDTORes> istorijaTreninga(String name) throws Exception {
        User user = userRepository.findByEmail(name);
        if (user == null) {
            throw new Exception("Korisnik ne postoji");
        }
        List<TreningDTORes> response = new ArrayList<>();
        List<Trening> treninzi = treningRepository.findAllByKorisnikOrderByIdDesc(user);
        for (Trening t : treninzi) {
            TreningDTORes tmp = new TreningDTORes();
            tmp.setId(t.getId());
            tmp.setVrsta(t.getVrsta());
            tmp.setKalorije(t.getKalorije());
            tmp.setTrajanje(t.getTrajanje());
            tmp.setTezina(t.getTezina());
            tmp.setUmor(t.getUmor());
            tmp.setBeleska(t.getBeleska());
            tmp.setTip(t.getTip());
            if (t.getDate() != null) {
                Format formatter = new SimpleDateFormat("yyyy-MM-dd");
                String s = formatter.format(t.getDate());
                tmp.setDatum(s);
            }
            response.add(tmp);
        }
        return response;
    }

    @Override
    public String beleziTrening(TreningDTOReq treningDTOReq, String name) throws Exception {
        User user = userRepository.findByEmail(name);
        if (user == null) {
            throw new Exception("Korisnik ne postoji");
        }
        Trening t = new Trening();
        t.setVrsta(treningDTOReq.getVrsta());
        t.setKalorije(treningDTOReq.getKalorije());
        t.setTrajanje(treningDTOReq.getTrajanje());
        t.setTezina(treningDTOReq.getTezina());
        t.setUmor(treningDTOReq.getUmor());
        t.setBeleska(treningDTOReq.getBeleska());
        t.setTip(treningDTOReq.getTip());
        t.setKorisnik(user);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        t.setDate(formatter.parse(treningDTOReq.getDatum()));
        treningRepository.save(t);
        return "Success";
    }

    @Override
    public String remove(int id, String name) throws Exception {
        User user = userRepository.findByEmail(name);
        if (user == null) {
            throw new Exception("Korisnik ne postoji");
        }
        Trening t = treningRepository.getOne(id);
        if (t.getKorisnik().getEmail() != user.getEmail()) {
            throw new Exception("Nemate permisiju");
        }
        treningRepository.deleteById(id);
        return "Success";
    }



    @Override
    public Map<Integer, Map<String, Object>> dashboard(int month, int year, String name) throws Exception {
        User user = userRepository.findByEmail(name);
        if (user == null) {
            throw new Exception("Korisnik ne postoji");
        }
        List<Object[]> results = treningRepository.getWeeklyStatistics(year, month, user.getId());
        Map<Integer, Map<String, Object>> weeklyStats = new HashMap<>();

        for (Object[] result : results) {
            Integer week = (Integer) result[0];
            Long totalTrening = (Long) result[1];
            Long totalTrajanje = (Long) result[2];
            Double avgTezina = (Double) result[3];
            Double avgUmor = (Double) result[4];
            Long totalKalorije = (Long) result[5];

            if (!weeklyStats.containsKey(week)) {
                Map<String, Object> weekStat = new HashMap<>();
                weekStat.put("totalTrening", totalTrening);
                weekStat.put("totalTrajanje", totalTrajanje);
                weekStat.put("avgTezina", avgTezina);
                weekStat.put("avgUmor", avgUmor);
                weekStat.put("totalKalorije", totalKalorije);
                weekStat.put("count", totalTrening);
                weeklyStats.put(week, weekStat);
            }


        }

        return weeklyStats;
    }
}
