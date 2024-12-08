import React, { useState, useEffect } from "react";
import axios from "axios";
import '../estilo/VehiculoForm.css';


const VehiculoForm = ({ vehiculo, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        tipo_vehiculo: "",
        descripcion_vehiculo: "",
        categoria: "",
        fecha_creacion_matricula: "",
        fecha_caducidad_matricula: "",
    });

    useEffect(() => {
        if (vehiculo) {
            setFormData({
                tipo_vehiculo: vehiculo.tipo_vehiculo,
                descripcion_vehiculo: vehiculo.descripcion_vehiculo,
                categoria: vehiculo.categoria,
                fecha_creacion_matricula: vehiculo.fecha_creacion_matricula,
                fecha_caducidad_matricula: vehiculo.fecha_caducidad_matricula,
            });
        }
    }, [vehiculo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const setTodayDate = () => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        setFormData({
            ...formData,
            fecha_creacion_matricula: formattedToday,
            fecha_caducidad_matricula: calculateExpiryDate(today),
        });
    };

    const calculateExpiryDate = (creationDate) => {
        const expiryDate = new Date(creationDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + 5);
        return expiryDate.toISOString().split("T")[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (vehiculo) {
                await axios.put(`http://localhost:8000/api/vehiculos/${vehiculo.id}`, formData);
            } else {
                await axios.post("http://localhost:8000/api/vehiculos", formData);
            }
            onSave();
        } catch (error) {
            console.error("Error al guardar el vehículo", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Gestión de Vehículos</h2>
            <div>
                <label>Tipo de Vehículo:</label>
                <input
                    type="text"
                    name="tipo_vehiculo"
                    value={formData.tipo_vehiculo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="descripcion_vehiculo"
                    value={formData.descripcion_vehiculo}
                    onChange={handleChange}
                />
            </div>
            <div>
    <label>Categoría:</label>
    <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
    >
        <option value="">Selecciona una categoría</option>
        <option value="Particular">Particular</option>
        <option value="Público">Público</option>
        <option value="Corporativo">Corporativo</option>
        <option value="Gobierno">Gobierno</option>
    </select>
</div>

            <div>
                <label>Fecha de Creación de Matrícula:</label>
                <input
                    type="date"
                    name="fecha_creacion_matricula"
                    value={formData.fecha_creacion_matricula}
                    onChange={handleChange}
                />
                <button type="button" onClick={setTodayDate}>
                    Establecer Fecha Actual
                </button>
            </div>
            <div>
                <label>Fecha de Caducidad de Matrícula:</label>
                <input
                    type="date"
                    name="fecha_caducidad_matricula"
                    value={formData.fecha_caducidad_matricula}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default VehiculoForm;
