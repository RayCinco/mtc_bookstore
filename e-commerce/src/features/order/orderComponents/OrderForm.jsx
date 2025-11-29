import { useState } from "react";

function OrderForm({ formData, onFormChange, errors, isSubmitting }) {
  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 5);
    return tomorrow.toISOString().split("T")[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

  function getInputClass(fieldName) {
    let baseClass = "form-control";
    if (errors[fieldName]) {
      baseClass += " is-invalid";
    } else if (formData[fieldName] && !errors[fieldName]) {
      baseClass += " is-valid";
    }
    return baseClass;
  }

  return (
    <>
      {/* Pickup Information */}
      <div className="card border-secondary mb-4">
        <div className="card-header bg-secondary border-0">
          <h4 className="font-weight-semi-bold m-0">
            <i className="fa fa-calendar-check mr-2"></i>
            Pickup Information
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="pickupDate">
                Pickup Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={getInputClass("pickupDate")}
                id="pickupDate"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={onFormChange}
                min={getMinDate()}
                max={getMaxDate()}
                required
              />
              {errors.pickupDate && (
                <div className="invalid-feedback d-block">
                  <i className="fa fa-exclamation-circle mr-1"></i>
                  {errors.pickupDate}
                </div>
              )}
              <small className="form-text text-muted">
                Available from 5 days to 30 days ahead
              </small>
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="pickupTime">
                Pickup Time <span className="text-danger">*</span>
              </label>
              <select
                className={getInputClass("pickupTime")}
                id="pickupTime"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={onFormChange}
                required
              >
                <option value="">Select a time</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
              </select>
              {errors.pickupTime && (
                <div className="invalid-feedback d-block">
                  <i className="fa fa-exclamation-circle mr-1"></i>
                  {errors.pickupTime}
                </div>
              )}
            </div>
          </div>
          <div className="form-group mb-0">
            <label htmlFor="specialInstructions">
              Special Instructions (Optional)
            </label>
            <textarea
              className="form-control"
              id="specialInstructions"
              name="specialInstructions"
              rows="3"
              placeholder="Any special requests or instructions..."
              value={formData.specialInstructions}
              onChange={onFormChange}
              maxLength="500"
            ></textarea>
            <small className="form-text text-muted">
              {formData.specialInstructions.length}/500 characters
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderForm;
