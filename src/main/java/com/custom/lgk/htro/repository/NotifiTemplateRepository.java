package com.custom.lgk.htro.repository;
import com.custom.lgk.htro.domain.NotifiTemplate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NotifiTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotifiTemplateRepository extends JpaRepository<NotifiTemplate, Long> {

}
