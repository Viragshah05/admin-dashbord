
import { useState } from 'react';
import { FieldArray, useFormik } from 'formik';
import InputField from '../../../components/custom/InputField';
import Buttons from '../../../components/custom/Buttons';
import IconsUrls from '../../../utils/constant/Icons';
import { getDataByPincode } from '../../../api/services/country';

const BuildingInformation = ({ previousClick, onSubmit, nextTabClick }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      buildingStatus: '',
      compoundedWall: '',
      buildingOwnerName: '',
      playGroundStatus: '',
      playGroundOwnerName: '',
      playgroundArea: '',
      buildingPlanOfSchoolSanctioned: '',
      permissionTaken: '',
      tpNumber: '',
      finalPlotNumber: '',
      surveyNumber: '',
      finalPlotSize: '',
      authorizedPerson: '',
      trustType: '',
      designationOfPerson: '',
      address1: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      landline: '',
      mobile: '',
    },
    onSubmit: async (values) => {
      // Handle form submission
    },
  });

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    formik.setFieldValue('pincode', pincode);
    if (pincode.length === 6) {
      setLoading(true);
      try {
        const response = await getDataByPincode({ pinCode: pincode });
        const { data } = response;
        formik.setFieldValue('city', data?.city?.name || ''); // Show name
        formik.setFieldValue('cityId', data?.city?.id || ''); // Store ID
        formik.setFieldValue('state', data?.state?.name || ''); // Show name
        formik.setFieldValue('stateId', data?.state?.id || ''); // Store ID
        formik.setFieldValue('country', data?.country?.name || 'India'); // Show name
        formik.setFieldValue('countryId', data?.country?.id || ''); // Store ID
      } catch (error) {
        formik.setFieldError('pincode', 'Error fetching pincode data');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl text-black">
            Building Information <br />
            <span className="text-base font-light">
              Join us and unlock a world of possibilities!
            </span>
          </h2>
          <div className="flex items-center gap-6">
            <Buttons
              text="Save"
              buttonStyle="bg-transparent border border-primaryOrange my-4 py-3 px-7"
            />
            <Buttons
              text="Previous"
              buttonStyle="bg-transparent border border-primaryOrange my-4 py-3 px-7"
              onClick={previousClick}
            />
            <Buttons
              onClick={nextTabClick}
              text="Next"
              buttonStyle="bg-primaryOrange border border-primaryOrange text-white py-3 px-7"
            />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-6">Building Information</h3>
          <h4 className="mb-2 text-base font-medium">
            Is school building being owned or rented?
          </h4>
          <div className="flex gap-4 my-6">
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Owned"
                checked={formik.values.buildingStatus === 'Owned'}
                name="buildingStatus"
                onChange={formik.handleChange}
              />
              Owned
            </label>
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Rented"
                checked={formik.values.buildingStatus === 'Rented'}
                name="buildingStatus"
                onChange={formik.handleChange}
              />
              Rented
            </label>
          </div>
          <div className="w-2/5 mb-6">
            <InputField
              label="Name of Owner*"
              name="buildingOwnerName"
              type="text"
              value={formik.values.buildingOwnerName}
              onChange={formik.handleChange}
              error={
                formik.touched.buildingOwnerName &&
                formik.errors.buildingOwnerName
              }
              icon={IconsUrls.User}
            />
          </div>

          <h4 className="text-base font-medium mt-6">
            Does the school have a compound?
          </h4>
          <div className="flex gap-4 my-6">
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Yes"
                checked={formik.values.compoundedWall === 'Yes'}
                name="compoundedWall"
                onChange={formik.handleChange}
              />
              Yes
            </label>
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="No"
                checked={formik.values.compoundedWall === 'No'}
                name="compoundedWall"
                onChange={formik.handleChange}
              />
              No
            </label>
          </div>

          <h4 className="mb-2 text-base font-medium">
            Is school playground being owned or rented?
          </h4>
          <div className="flex gap-4 my-6">
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Owned Playgoround"
                checked={formik.values.playGroundStatus === 'Owned Playgoround'}
                name="playGroundStatus"
                onChange={formik.handleChange}
              />
              Owned
            </label>
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Rented Playground"
                checked={formik.values.playGroundStatus === 'Rented Playground'}
                name="playGroundStatus"
                onChange={formik.handleChange}
              />
              Rented
            </label>
          </div>
          <div className="w-2/5 mb-6">
            <InputField
              label="Name of Owner*"
              name="playGroundOwnerName"
              type="text"
              value={formik.values.playGroundOwnerName}
              onChange={formik.handleChange}
              error={
                formik.touched.playGroundOwnerName &&
                formik.errors.playGroundOwnerName
              }
              icon={IconsUrls.User}
            />
          </div>

          <h4 className="font-semibold text-2xl text-black mb-2">
            Area of play ground(Sq. Meter) <br />
            <span className="text-base font-light">
              Excluding area of margin space and any kind of constructed area
            </span>
          </h4>
          <div className="w-2/5 mb-6">
            <InputField
              label="Sq. Meter*"
              name="playgroundArea"
              type="umber"
              value={formik.values.playgroundArea}
              onChange={formik.handleChange}
              error={
                formik.touched.playgroundArea && formik.errors.playgroundArea
              }
              icon={IconsUrls.Area}
            />
          </div>

          <h4 className="text-base font-medium mt-6">
            Is layout/building plan of school sanctioned by competent authority?
          </h4>
          <div className="flex gap-4 my-6">
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Yes"
                checked={formik.values.buildingPlanOfSchoolSanctioned === 'Yes'}
                name="buildingPlanOfSchoolSanctioned"
                onChange={formik.handleChange}
              />
              Yes
            </label>
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="No"
                checked={formik.values.buildingPlanOfSchoolSanctioned === 'No'}
                name="buildingPlanOfSchoolSanctioned"
                onChange={formik.handleChange}
              />
              No
            </label>
          </div>
          <h4 className="text-base font-medium mt-6">
            Is school building usage permission taken by authority?
          </h4>
          <div className="flex gap-4 my-6">
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="Yes"
                checked={formik.values.permissionTaken === 'Yes'}
                name="permissionTaken"
                onChange={formik.handleChange}
              />
              Yes
            </label>
            <label className="text-base font-semibold flex items-center gap-2">
              <input
                className="roundedCheckbox"
                type="radio"
                value="No"
                checked={formik.values.permissionTaken === 'No'}
                name="permissionTaken"
                onChange={formik.handleChange}
              />
              No
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <InputField
              label="TP Number"
              name="tpNumber"
              type="text"
              svg={<img src={IconsUrls.Code} alt="icon" />}
              value={formik.values.tpNumber}
              onChange={formik.handleChange}
              //   error={formik.touched.mobile && formik.errors.mobile}
            />
            <InputField
              label="Final Plot Number"
              name="finalPlotNumber"
              type="text"
              svg={<img src={IconsUrls.Code} alt="icon" />}
              value={formik.values.finalPlotNumber}
              onChange={formik.handleChange}
              //   error={formik.touched.mobile && formik.errors.mobile}
            />
            <InputField
              label="Survey Number"
              name="surveyNumber"
              type="text"
              svg={<img src={IconsUrls.Code} alt="icon" />}
              value={formik.values.surveyNumber}
              onChange={formik.handleChange}
              //   error={formik.touched.mobile && formik.errors.mobile}
            />
            <InputField
              label="Final Plot Size(Sq. Meter)"
              name="finalPlotSize"
              type="number"
              svg={<img src={IconsUrls.Area} alt="icon" />}
              value={formik.values.finalPlotSize}
              onChange={formik.handleChange}
              //   error={formik.touched.mobile && formik.errors.mobile}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">
              Trust/Body Correspondent Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <InputField
                label="Authorized Correspondence Person*"
                name="authorizedPerson"
                type="text"
                svg={<img src={IconsUrls.User} alt="icon" />}
                value={formik.values.authorizedPerson}
                onChange={formik.handleChange}
                //   error={formik.touched.mobile && formik.errors.mobile}
              />
              <InputField
                label="Designation of The Person*"
                name="designationOfPerson"
                type="text"
                svg={<img src={IconsUrls.User} alt="icon" />}
                value={formik.values.designationOfPerson}
                onChange={formik.handleChange}
                //   error={formik.touched.mobile && formik.errors.mobile}
              />
              <InputField
                label="Trust Type*"
                name="trustType"
                type="text"
                svg={<img src={IconsUrls.InstituteSvg} alt="icon" />}
                value={formik.values.trustType}
                onChange={formik.handleChange}
                //   error={formik.touched.mobile && formik.errors.mobile}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <InputField
                label="Address line 1*"
                name="address1"
                type="text"
                svg={<img src={IconsUrls.Location} alt="icon" />}
                value={formik.values.address1}
                onChange={formik.handleChange}
                error={formik.touched.address1 && formik.errors.address1}
              />
              <InputField
                label="Address line 2*"
                name="address2"
                type="text"
                svg={<img src={IconsUrls.Location} alt="icon" />}
                value={formik.values.address2}
                onChange={formik.handleChange}
                error={formik.touched.address2 && formik.errors.address2}
              />
              <div>
                <InputField
                  label="Pincode*"
                  name="pincode"
                  type="number"
                  value={formik.values.pincode}
                  onChange={(e) => handlePincodeChange(e)}
                  error={formik.touched.pincode && formik.errors.pincode}
                  icon={IconsUrls.Pincode}
                />
                {loading && <p>Loading location details...</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <InputField
                label="Country*"
                name="country"
                svg={<img src={IconsUrls.CountryGlobal} alt="icon" />}
                value={formik.values.country}
                error={formik.touched.country && formik.errors.country}
              />
              <InputField
                label="State*"
                name="state"
                svg={<img src={IconsUrls.StateMap} alt="icon" />}
                value={formik.values.state}
                //   error={formik.touched.state && formik.errors.state}
              />
              <InputField
                label="City*"
                name="city"
                svg={<img src={IconsUrls.City} alt="icon" />}
                value={formik.values.city}
                //   error={formik.touched.city && formik.errors.city}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <InputField
                label="Mobile*"
                name="mobile"
                type="text"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && formik.errors.mobile}
              />
              <InputField
                label="Landline*"
                name="landline"
                type="text"
                value={formik.values.landline}
                onChange={formik.handleChange}
                error={formik.touched.landline && formik.errors.landline}
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Facilities Information</h3>.
            <div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 grid grid-cols-3 gap-4 font-semibold">
                <div>Facility Name</div>
                <div>Quantity</div>
                <div>Action</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BuildingInformation;
