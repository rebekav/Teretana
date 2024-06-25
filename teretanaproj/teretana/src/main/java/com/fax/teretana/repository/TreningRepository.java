package com.fax.teretana.repository;

import com.fax.teretana.model.Trening;
import com.fax.teretana.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreningRepository extends JpaRepository<Trening, Integer> {
    List<Trening> findAllByKorisnikOrderByIdDesc(User user);


    @Query("SELECT WEEK(t.datum) as week, " +
            "COUNT(t) as totalTrening, " +
            "SUM(t.trajanje) as totalTrajanje, " +
            "AVG(t.tezina) as avgTezina, " +
            "AVG(t.umor) as avgUmor, " +
            "SUM(t.kalorije) as totalKalorije " +
            "FROM Trening t " +
            "WHERE YEAR(t.datum) = :year AND MONTH(t.datum) = :month AND t.korisnik.id = :korisnik " +
            "GROUP BY WEEK(t.datum) " +
            "ORDER BY WEEK(t.datum)")
    List<Object[]> getWeeklyStatistics(@Param("year") int year, @Param("month") int month, @Param("korisnik") int id);
}
