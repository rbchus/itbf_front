
ESTRUCTURA DEL PROYECTO REACT
(cada componete esta acompañado de su css con el mismo nombre)

src/
│
--- components/
--------------- Hoteles.jsx
--------------- HotelForm.jsx
--------------- HotelFormInput.jsx
--------------- HabitacionForm.jsx
--------------- Loading.jsx
│
--- services/
│
------------- habitacionesService.js
------------- hotelesService.js
│
--- hooks/
│
----------- useHoteles.js
│
- App.js
│


cambios archivo .env
VITE_API_BASE_URL=http://localhost:8000/api

INSTALACION DEL PROYECTO REACT

1.git clone 
	https://github.com/rbchus/itbf_front.git
2. cd hoteles_frontend
3. npm install
4. npm run dev
