import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import "../../styles/HomeShip.css";
import Cookies from "js-cookie";

const ShipComponentEditForm = ({ component, onSave, onCancel }) => {
  const isEdit = Boolean(component);
  const [availableShips, setAvailableShips] = useState([]);

  const [formData, setFormData] = useState({
    shipId: "",
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });

  useEffect(() => {
    const shipsFromCookie = Cookies.get("ships");
    if (shipsFromCookie) {
      try {
        const parsedShips = JSON.parse(shipsFromCookie);
        setAvailableShips(parsedShips);
      } catch (err) {
        console.error("Invalid ships cookie:", err);
      }
    }

    if (component) {
      setFormData({
        shipId: component.shipId || "",
        name: component.name || "",
        serialNumber: component.serialNumber || "",
        installDate: component.installDate || "",
        lastMaintenanceDate: component.lastMaintenanceDate || "",
      });
    }
  }, [component]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shipId && !isEdit) return;
    onSave({ ...(component || {}), ...formData });
  };

  return (
    <div className="ship-edit-overlay">
      <div className="ship-edit-container">
        <div className="ship-edit-header">
          <h2>{isEdit ? "Edit Component" : "Add Component"}</h2>
          <button className="close-button" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ship-edit-form">
          {!isEdit && (
            <div className="form-group">
              <label htmlFor="shipId">Select Ship</label>
              <select
                id="shipId"
                name="shipId"
                value={formData.shipId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a Ship --</option>
                {availableShips.map((ship) => (
                  <option key={ship.id} value={ship.id}>
                    {ship.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Component Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="serialNumber">Serial Number</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="installDate">Install Date</label>
            <input
              type="date"
              id="installDate"
              name="installDate"
              value={formData.installDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastMaintenanceDate">Last Maintenance Date</label>
            <input
              type="date"
              id="lastMaintenanceDate"
              name="lastMaintenanceDate"
              value={formData.lastMaintenanceDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              {isEdit ? "Save Changes" : "Add Component"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipComponentEditForm;
