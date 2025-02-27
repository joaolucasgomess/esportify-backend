PGDMP  .                    |         	   ESPORTIFY    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24975 	   ESPORTIFY    DATABASE     �   CREATE DATABASE "ESPORTIFY" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE "ESPORTIFY";
                postgres    false            �            1259    25014    data_aluguel    TABLE     �   CREATE TABLE public.data_aluguel (
    id_datas_aluguel character varying NOT NULL,
    data date NOT NULL,
    id_horario_aluguel character varying
);
     DROP TABLE public.data_aluguel;
       public         heap    postgres    false            �            1259    24995 
   dia_semana    TABLE     z   CREATE TABLE public.dia_semana (
    id_dia_semana character varying NOT NULL,
    desc_dia character varying NOT NULL
);
    DROP TABLE public.dia_semana;
       public         heap    postgres    false            �            1259    24976    endereco    TABLE        CREATE TABLE public.endereco (
    id_endereco character varying NOT NULL,
    rua character varying NOT NULL,
    bairro character varying NOT NULL,
    cidade character varying NOT NULL,
    numero integer NOT NULL,
    cep character varying NOT NULL
);
    DROP TABLE public.endereco;
       public         heap    postgres    false            �            1259    25002    horario_aluguel    TABLE     .  CREATE TABLE public.horario_aluguel (
    id_horario_aluguel character varying NOT NULL,
    horario_inicial time without time zone NOT NULL,
    horario_final time without time zone NOT NULL,
    preco double precision NOT NULL,
    id_dia_semana character varying,
    id_quadra character varying
);
 #   DROP TABLE public.horario_aluguel;
       public         heap    postgres    false            �            1259    24983    quadra    TABLE     �   CREATE TABLE public.quadra (
    id_quadra character varying NOT NULL,
    nome character varying NOT NULL,
    id_endereco character varying
);
    DROP TABLE public.quadra;
       public         heap    postgres    false                      0    25014    data_aluguel 
   TABLE DATA           R   COPY public.data_aluguel (id_datas_aluguel, data, id_horario_aluguel) FROM stdin;
    public          postgres    false    219          �          0    24995 
   dia_semana 
   TABLE DATA           =   COPY public.dia_semana (id_dia_semana, desc_dia) FROM stdin;
    public          postgres    false    217   :       �          0    24976    endereco 
   TABLE DATA           Q   COPY public.endereco (id_endereco, rua, bairro, cidade, numero, cep) FROM stdin;
    public          postgres    false    215                     0    25002    horario_aluguel 
   TABLE DATA           ~   COPY public.horario_aluguel (id_horario_aluguel, horario_inicial, horario_final, preco, id_dia_semana, id_quadra) FROM stdin;
    public          postgres    false    218   �       �          0    24983    quadra 
   TABLE DATA           >   COPY public.quadra (id_quadra, nome, id_endereco) FROM stdin;
    public          postgres    false    216   q       i           2606    25020    data_aluguel data_aluguel_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.data_aluguel
    ADD CONSTRAINT data_aluguel_pkey PRIMARY KEY (id_datas_aluguel);
 H   ALTER TABLE ONLY public.data_aluguel DROP CONSTRAINT data_aluguel_pkey;
       public            postgres    false    219            e           2606    25001    dia_semana dia_semana_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.dia_semana
    ADD CONSTRAINT dia_semana_pkey PRIMARY KEY (id_dia_semana);
 D   ALTER TABLE ONLY public.dia_semana DROP CONSTRAINT dia_semana_pkey;
       public            postgres    false    217            a           2606    24982    endereco endereco_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (id_endereco);
 @   ALTER TABLE ONLY public.endereco DROP CONSTRAINT endereco_pkey;
       public            postgres    false    215            g           2606    25008 $   horario_aluguel horario_aluguel_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.horario_aluguel
    ADD CONSTRAINT horario_aluguel_pkey PRIMARY KEY (id_horario_aluguel);
 N   ALTER TABLE ONLY public.horario_aluguel DROP CONSTRAINT horario_aluguel_pkey;
       public            postgres    false    218            c           2606    24989    quadra quadra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.quadra
    ADD CONSTRAINT quadra_pkey PRIMARY KEY (id_quadra);
 <   ALTER TABLE ONLY public.quadra DROP CONSTRAINT quadra_pkey;
       public            postgres    false    216            m           2606    25021 1   data_aluguel data_aluguel_id_horario_aluguel_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.data_aluguel
    ADD CONSTRAINT data_aluguel_id_horario_aluguel_fkey FOREIGN KEY (id_horario_aluguel) REFERENCES public.horario_aluguel(id_horario_aluguel);
 [   ALTER TABLE ONLY public.data_aluguel DROP CONSTRAINT data_aluguel_id_horario_aluguel_fkey;
       public          postgres    false    219    218    4711            k           2606    25009 2   horario_aluguel horario_aluguel_id_dia_semana_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.horario_aluguel
    ADD CONSTRAINT horario_aluguel_id_dia_semana_fkey FOREIGN KEY (id_dia_semana) REFERENCES public.dia_semana(id_dia_semana);
 \   ALTER TABLE ONLY public.horario_aluguel DROP CONSTRAINT horario_aluguel_id_dia_semana_fkey;
       public          postgres    false    218    4709    217            l           2606    25026 .   horario_aluguel horario_aluguel_id_quadra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.horario_aluguel
    ADD CONSTRAINT horario_aluguel_id_quadra_fkey FOREIGN KEY (id_quadra) REFERENCES public.quadra(id_quadra);
 X   ALTER TABLE ONLY public.horario_aluguel DROP CONSTRAINT horario_aluguel_id_quadra_fkey;
       public          postgres    false    218    4707    216            j           2606    24990    quadra quadra_id_endereco_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quadra
    ADD CONSTRAINT quadra_id_endereco_fkey FOREIGN KEY (id_endereco) REFERENCES public.endereco(id_endereco);
 H   ALTER TABLE ONLY public.quadra DROP CONSTRAINT quadra_id_endereco_fkey;
       public          postgres    false    215    216    4705                  x������ � �      �   �   x�E��JD1���dH�6m�#�nڤ��O0���9�{���6�j
�{��a֪ͣ�x��	��C����t��������y�8���u���A���<��_��pY���E5F��ΛP)��	�S@+��\@+i6��Rb��	WtAs�+�ʓ��N�,���tB'�Ă���ښ��}�o���R��J      �   �   x����m�0��<E` J�(-�)z�D
Hbą�f�mR��������G��	�<B@�+6�T݇�rj��IE�����m��.���Jq1$���<����PrDM{���w��ۥ� �b���;���K
JI	��lm��/�ulg�ݼ��!r�N݆>�	��2��1�U��%�H�f������D*XThD�G�j\rx�Ɨ�E��~����j�          j   x�5��C!Ck��9��3K����N�+�$�FF�\��'��������n\�6mYWm&�l����E$�W�N�zh���$�c��z�Z?�Z��-�      �   �   x�}�1R1E��S�Q��lY��B#YrO6i8=;�i��͗
�U�l`��	a�^`�V���h�y{�̗���Ŏ��:B � h�
f%г���N� �T��Z�h<��_����B���8�̼����H�� �� �"�����u{B�94y�+DT�St��!��.)`���|A*o�<�Y���2�[돠B6c.c�H_^�ӿ�m{f��<��!�QSW����}�C�p     