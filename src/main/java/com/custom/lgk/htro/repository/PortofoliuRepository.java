package com.custom.lgk.htro.repository;
import com.custom.lgk.htro.domain.Portofoliu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Portofoliu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PortofoliuRepository extends JpaRepository<Portofoliu, Long> {

}
