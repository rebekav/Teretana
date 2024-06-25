package com.fax.teretana.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * The persistent class for the pregled database table.
 */
@Entity
@Table(name = "trening")
@NamedQuery(name = "Trening.findAll", query = "SELECT t FROM Trening t")
public class Trening implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String vrsta;

    private int trajanje;

    private int kalorije;

    private int tezina;

    private int umor;

    private String beleska;

    private String tip;

    @Temporal(TemporalType.DATE)
    private Date datum;

    @ManyToOne
    @JoinColumn(name = "korisnik")
    private User korisnik;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVrsta() {
        return vrsta;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

    public int getTrajanje() {
        return trajanje;
    }

    public void setTrajanje(int trajanje) {
        this.trajanje = trajanje;
    }

    public int getKalorije() {
        return kalorije;
    }

    public void setKalorije(int kalorije) {
        this.kalorije = kalorije;
    }

    public int getTezina() {
        return tezina;
    }

    public void setTezina(int tezina) {
        this.tezina = tezina;
    }

    public int getUmor() {
        return umor;
    }

    public void setUmor(int umor) {
        this.umor = umor;
    }

    public String getBeleska() {
        return beleska;
    }

    public void setBeleska(String beleska) {
        this.beleska = beleska;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public User getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(User korisnik) {
        this.korisnik = korisnik;
    }

    public Date getDate() {
        return datum;
    }

    public void setDate(Date date) {
        this.datum = date;
    }
}
