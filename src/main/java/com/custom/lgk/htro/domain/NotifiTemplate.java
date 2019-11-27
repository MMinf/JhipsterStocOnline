package com.custom.lgk.htro.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A NotifiTemplate.
 */
@Entity
@Table(name = "notifi_template")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "notifitemplate")
public class NotifiTemplate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "email_addresses", nullable = false)
    private String emailAddresses;

    @Size(max = 600)
    @Column(name = "message", length = 600)
    private String message;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailAddresses() {
        return emailAddresses;
    }

    public NotifiTemplate emailAddresses(String emailAddresses) {
        this.emailAddresses = emailAddresses;
        return this;
    }

    public void setEmailAddresses(String emailAddresses) {
        this.emailAddresses = emailAddresses;
    }

    public String getMessage() {
        return message;
    }

    public NotifiTemplate message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotifiTemplate)) {
            return false;
        }
        return id != null && id.equals(((NotifiTemplate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NotifiTemplate{" +
            "id=" + getId() +
            ", emailAddresses='" + getEmailAddresses() + "'" +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
