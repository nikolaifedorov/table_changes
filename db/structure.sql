--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cell_histories; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE cell_histories (
    id integer NOT NULL,
    start integer,
    "end" integer,
    text character varying(255),
    cell_text_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: cell_histories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE cell_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cell_histories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE cell_histories_id_seq OWNED BY cell_histories.id;


--
-- Name: cell_texts; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE cell_texts (
    id integer NOT NULL,
    index character varying(255),
    text text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: cell_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE cell_texts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cell_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE cell_texts_id_seq OWNED BY cell_texts.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY cell_histories ALTER COLUMN id SET DEFAULT nextval('cell_histories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY cell_texts ALTER COLUMN id SET DEFAULT nextval('cell_texts_id_seq'::regclass);


--
-- Name: cell_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY cell_histories
    ADD CONSTRAINT cell_histories_pkey PRIMARY KEY (id);


--
-- Name: cell_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY cell_texts
    ADD CONSTRAINT cell_texts_pkey PRIMARY KEY (id);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: fk_cell_histories_cell_texts; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY cell_histories
    ADD CONSTRAINT fk_cell_histories_cell_texts FOREIGN KEY (cell_text_id) REFERENCES cell_texts(id);


--
-- PostgreSQL database dump complete
--

INSERT INTO schema_migrations (version) VALUES ('20120813115941');

INSERT INTO schema_migrations (version) VALUES ('20120814133314');