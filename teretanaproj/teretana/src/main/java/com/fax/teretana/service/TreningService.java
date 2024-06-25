package com.fax.teretana.service;

import com.fax.teretana.dto.TreningDTOReq;
import com.fax.teretana.dto.TreningDTORes;

import java.util.List;
import java.util.Map;

public interface TreningService {
    List<TreningDTORes> istorijaTreninga(String name) throws Exception;

    String beleziTrening(TreningDTOReq treningDTOReq, String name) throws Exception;

    String remove(int id, String name) throws Exception;

    Map<Integer, Map<String, Object>> dashboard(int month, int year, String name) throws Exception;
}
