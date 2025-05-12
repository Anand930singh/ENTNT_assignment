import { useState, useEffect } from "react"
import { Save, X } from "lucide-react"
import "../../styles/HomeShip.css"

const ShipComponentEditForm = ({ component, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  })

  useEffect(() => {
    if (component) {
      setFormData({
        name: component.name || "",
        serialNumber: component.serialNumber || "",
        installDate: component.installDate || "",
        lastMaintenanceDate: component.lastMaintenanceDate || "",
      })
    }
  }, [component])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...component, ...formData }) // Pass updated component with id and shipId intact
  }

  return (
    <div className="ship-edit-overlay">
      <div className="ship-edit-container">
        <div className="ship-edit-header">
          <h2>Edit Component</h2>
          <button className="close-button" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ship-edit-form">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShipComponentEditForm