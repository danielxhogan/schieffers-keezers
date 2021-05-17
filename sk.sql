--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.addresses (
    address_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    street character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    zip integer NOT NULL
);


ALTER TABLE public.addresses OWNER TO rando_mane;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.cart (
    cart_item_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    qty integer NOT NULL
);


ALTER TABLE public.cart OWNER TO rando_mane;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.categories (
    category_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO rando_mane;

--
-- Name: images; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.images (
    image_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.images OWNER TO rando_mane;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.order_items (
    order_item_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    qty integer
);


ALTER TABLE public.order_items OWNER TO rando_mane;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.orders (
    order_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    address_id uuid NOT NULL,
    created timestamp without time zone NOT NULL,
    total double precision NOT NULL
);


ALTER TABLE public.orders OWNER TO rando_mane;

--
-- Name: products; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.products (
    product_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    category_id uuid NOT NULL
);


ALTER TABLE public.products OWNER TO rando_mane;

--
-- Name: users; Type: TABLE; Schema: public; Owner: rando_mane
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO rando_mane;

--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.addresses (address_id, user_id, street, city, state, zip) FROM stdin;
a7f274e1-3c6a-41a1-a9e6-189bae63110c	00c33a9a-1244-4e2c-9b2b-812e9821e380	666 elm street	Portlandiasuh dude	oregon	9752666
b086af93-7859-4a47-a3ac-01ca5ccd32bf	83ed6975-42fa-4c9f-9fe9-635f1a2b238d	363 Hell streettt	Grants Pass	oregon	97526
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.cart (cart_item_id, user_id, product_id, qty) FROM stdin;
574f8952-5ceb-4cb0-8275-803342fa7bb0	00c33a9a-1244-4e2c-9b2b-812e9821e380	02c9fa63-842d-4cdc-8429-6ee60fe1859c	1
d6f0b72d-5d79-4847-9291-7351c24a6bf2	00c33a9a-1244-4e2c-9b2b-812e9821e380	2be45f8a-a15d-4354-b028-255b22ad2319	1
a3ab4080-6231-4e51-93bb-577814a3ba43	835aa4aa-d43a-47a4-85ba-d6343d1d777c	72befd26-57a9-40a1-bb12-78e5fa389e7d	1
b5ecb4c9-be7c-4cec-a521-f3f127594002	835aa4aa-d43a-47a4-85ba-d6343d1d777c	8ad1871c-41c3-4173-9927-bd27bb081f8b	1
917ce5e1-9010-4448-9e4f-67c9054ea229	835aa4aa-d43a-47a4-85ba-d6343d1d777c	3e394492-429e-4e01-bfc6-f75f77013b7c	1
5ed998fd-9f50-450e-a1b8-f8d2a1c418f2	83ed6975-42fa-4c9f-9fe9-635f1a2b238d	72befd26-57a9-40a1-bb12-78e5fa389e7d	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.categories (category_id, name) FROM stdin;
98773aaa-8762-44d3-931b-df3bdc16e7a7	freezer
3940e6d1-fb99-425e-98ac-1b6856861259	thermostat
d3626336-8a6f-4592-a898-abbaa7669369	tapkit
9b9a24aa-0669-40ce-a827-78437be7c0b2	c02tank
29fabcfe-f13f-450b-8767-6fb809fc5877	drippan
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.images (image_id, name, product_id) FROM stdin;
fe1fa6f4-ece3-420b-81d6-842f6bb7d020	small-freezer.jpg	72befd26-57a9-40a1-bb12-78e5fa389e7d
6a9c4c9f-f783-48f6-b2cd-476b64e6f596	large-freezer.jpg	2be45f8a-a15d-4354-b028-255b22ad2319
8b0ce6b0-003b-4617-ae32-78ef0de5796d	medium-freezer.jpg	83abdbdc-e6a2-4517-aac3-3de9e0f6d96e
b3a62d1b-c036-4ea9-b9fd-8365ae7a1d3a	external-thermostat.jpg	22a30ada-c672-4d0c-956d-ccac30385062
7e9f4945-3873-4196-b04b-12c9e940b50b	single-tap-kit.jpg	8ad1871c-41c3-4173-9927-bd27bb081f8b
c993f6fa-1ef4-465b-9326-894e16179a79	double-tap-kit.jpg	e3c22c06-4b0c-4065-bd32-53931b8e37cf
33fd1959-74aa-47d7-a531-8e36d8bf585e	triple-tap-kit.jpg	6df294e5-e793-4795-8f88-d0d4bd4c7df6
ed09e1cb-bf04-4c47-8e7b-93deaa62351d	quad-tap-kit.jpg	43effc93-f830-45a9-8f6a-29b2f48db1c4
f9c3d0fd-38d7-42e3-b336-1e1dcf970fc3	large-c02-tank.jpg	5c94bb39-cf42-42e1-831c-04a18545adc7
cbefeb38-a300-4958-a80b-02cf2555227d	internal-thermostat.jpg	02c9fa63-842d-4cdc-8429-6ee60fe1859c
fe3449a4-4b89-4342-9aac-2af8ecf24581	medium-c02-tank.jpg	fff36910-5d1a-4043-8215-8a5255464068
ad8145f4-7aa0-4cd4-9954-c55f414c5e0e	small-c02-tank.jpg	3e394492-429e-4e01-bfc6-f75f77013b7c
f564878d-2d9a-4894-8d44-5b4ad1b6dbe6	small-drip-pan.jpg	b73b9e74-6179-4182-bae8-690cb8256c43
4a38215e-8b25-45c1-b2b6-33ea729d4ce0	large-drip-pan.jpg	211cf594-1c69-466b-ba7d-9328592f0487
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.order_items (order_item_id, order_id, product_id, qty) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.orders (order_id, user_id, address_id, created, total) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.products (product_id, name, description, price, category_id) FROM stdin;
72befd26-57a9-40a1-bb12-78e5fa389e7d	Small Freezer	3.5 cubic ft	200.00	98773aaa-8762-44d3-931b-df3bdc16e7a7
83abdbdc-e6a2-4517-aac3-3de9e0f6d96e	Medium Freezer	7.0 cubic ft	350.00	98773aaa-8762-44d3-931b-df3bdc16e7a7
2be45f8a-a15d-4354-b028-255b22ad2319	Large Freezer	10 cubic ft	500.00	98773aaa-8762-44d3-931b-df3bdc16e7a7
22a30ada-c672-4d0c-956d-ccac30385062	External Thermostat	Inkbird homebrew outlet thermostat	35.00	3940e6d1-fb99-425e-98ac-1b6856861259
8ad1871c-41c3-4173-9927-bd27bb081f8b	Single Tap Kit	tap kit w/ one tap for one keg	150.00	d3626336-8a6f-4592-a898-abbaa7669369
e3c22c06-4b0c-4065-bd32-53931b8e37cf	Double Tap Kit	tap kit w/ two taps for two kegs	200.00	d3626336-8a6f-4592-a898-abbaa7669369
6df294e5-e793-4795-8f88-d0d4bd4c7df6	Triple Tap Kit	tap kit w/ three taps for three kegs	250.00	d3626336-8a6f-4592-a898-abbaa7669369
43effc93-f830-45a9-8f6a-29b2f48db1c4	Quad Tap Kit	tap kit w/ four taps for four kegs	300.00	d3626336-8a6f-4592-a898-abbaa7669369
5c94bb39-cf42-42e1-831c-04a18545adc7	Large c02 Tank	10lb.	200.00	9b9a24aa-0669-40ce-a827-78437be7c0b2
02c9fa63-842d-4cdc-8429-6ee60fe1859c	Internal Thermostat	Fridge temperature controller	50.00	3940e6d1-fb99-425e-98ac-1b6856861259
fff36910-5d1a-4043-8215-8a5255464068	Medium c02 Tank	5lb.	100.00	9b9a24aa-0669-40ce-a827-78437be7c0b2
3e394492-429e-4e01-bfc6-f75f77013b7c	Small c02 Tank	2.5lb.	50.00	9b9a24aa-0669-40ce-a827-78437be7c0b2
b73b9e74-6179-4182-bae8-690cb8256c43	Small Drip Pan	12" wide	40.00	29fabcfe-f13f-450b-8767-6fb809fc5877
211cf594-1c69-466b-ba7d-9328592f0487	Large Drip Pan	15.7" wide	60.00	29fabcfe-f13f-450b-8767-6fb809fc5877
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rando_mane
--

COPY public.users (user_id, first_name, last_name, email, password) FROM stdin;
83ed6975-42fa-4c9f-9fe9-635f1a2b238d	Daniel	Hogan	dhogan382666@yahoo.com	$2b$10$AKdw5KwLgrUF2JD7Dws5NuMxJN4DRWx/0DPy8Q867sPdv8rq4XqW.
22a39cb1-e17b-4c2a-a09a-7cee6f045d52	Tanner	Scheiffer	illmanner@yahoo.com	$2b$10$ogbNdGitdbSyyfkTV/Sk3.3EQ8lT.b5fxthutWXXY5NnJaj5i3qhu
00c33a9a-1244-4e2c-9b2b-812e9821e380	Riley	Baker	fakeemail@yeah.com	$2b$10$diSwxsX4nX64nlWRFzhEDuskB.x9vOswJKlwAPYYiRUv5i.SFfIVm
835aa4aa-d43a-47a4-85ba-d6343d1d777c	g-dawg	ellington	sirwalter@getthatbag.com	$2b$10$8trB.qWUHbRs.oi6NxHyQerSCVU/p2n8OWDzyCpDxoURX3kTihB/i
\.


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (address_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_item_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: cart cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: orders orders_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(address_id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- Name: images products_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rando_mane
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- PostgreSQL database dump complete
--

