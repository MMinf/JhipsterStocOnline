package com.custom.lgk.htro.repository;
import com.custom.lgk.htro.domain.Stoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StocRepository extends JpaRepository<Stoc, Long> {

}
