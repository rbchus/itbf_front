- **Frontend:** Aplicación web construida con React y Vite.
  
INSTALACION DEL PROYECTO REACT

1.git clone 
	https://github.com/rbchus/itbf_front.git
2. cd hoteles_frontend
3. npm install
4. npm run dev

cambios archivo .env par local
VITE_API_BASE_URL=http://localhost:8000/api

NOTA: Tener en cuanta el .env si se va a probar con api local o en la nube / como esta el repositorio es para el despliegue en la nube

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
