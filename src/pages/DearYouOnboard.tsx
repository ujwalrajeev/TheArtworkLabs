import "./DearYouOnboard.scss";
import Header from "../components/Header";
import AuthenticationModal from "../components/AuthenticationModal";
import { useState } from "react";
import {
  Button,
  Tabs,
  InputGroup,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Envelope,
  Handset,
  Plus,
  House,
  TrafficLight,
  Globe,
  MapPin,
} from "@gravity-ui/icons";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PricePlanItem = ({
  heading,
  frequency,
  price,
  isFirstFree,
  isPopular,
  selected,
  selectedPlan,
  planID,
}: {
  heading: string;
  frequency: string;
  price: string;
  isFirstFree: boolean;
  isPopular: boolean;
  selected: boolean;
  selectedPlan: React.Dispatch<React.SetStateAction<number>>;
  planID: number;
}) => {
  return (
    <div
      className={
        selected
          ? "price-plan-item-container selected"
          : "price-plan-item-container"
      }
      onClick={() => selectedPlan(planID)}
    >
      <p className="heading">{heading}</p>
      <p className="price">{price}</p>
      <p className="frequency">{frequency}</p>
      {isFirstFree && (
        <div className="first-free">
          <p>first free</p>
        </div>
      )}
      {isPopular && (
        <div className="featured">
          <p>Best deal</p>
        </div>
      )}
      {selected && (
        <div className="selected-box">
          <Check />
        </div>
      )}
    </div>
  );
};

type Country = {
  countryName: string;
  id: number;
};

type State = {
  stateName: string;
  id: number;
};

export default function DearYouOnboard() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("plan");
  const [selectedPlan, setSelectedPlan] = useState<number>(3);

  type UserDetailsValidity = {
    firstName: boolean;
    lastName: boolean;
    countryCode: boolean;
    phone: boolean;
    houseNumber: boolean;
    streetName: boolean;
    country: boolean;
    state: boolean;
    city: boolean;
    pincode: boolean;
  };

  type ValidationMessage = {
    [key in keyof UserDetailsValidity]: string;
  };

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    countryCode: 44,
    phone: 0,
    country: "",
    state: "",
    city: "",
    pincode: "",
    houseNumber: "",
    streetName: "",
    deliveryInstructions: "",
  });

  const [userDetailsValidity, setUserDetailsValidity] =
    useState<UserDetailsValidity>({
      firstName: false,
      lastName: false,
      countryCode: false,
      phone: false,
      country: false,
      state: false,
      city: false,
      pincode: false,
      houseNumber: false,
      streetName: false,
    });

  const [validationMessage, setValidationMessage] = useState<ValidationMessage>(
    {
      firstName: "",
      lastName: "",
      countryCode: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      houseNumber: "",
      streetName: "",
    },
  );

  const [country, setCountry] = useState<Country>({
    countryName: "",
    id: 0,
  });
  const [state, setState] = useState<State>({
    stateName: "",
    id: 0,
  });

  //---------------------------------Validation--------------------------------------

  const validateUserDetails = () => {
    const errors: UserDetailsValidity = {
      firstName: false,
      lastName: false,
      countryCode: false,
      phone: false,
      houseNumber: false,
      streetName: false,
      country: false,
      state: false,
      city: false,
      pincode: false,
    };

    const messages: ValidationMessage = {
      firstName: "",
      lastName: "",
      countryCode: "",
      phone: "",
      houseNumber: "",
      streetName: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    };
    if (!userDetails.firstName.trim()) {
      errors.firstName = true;
      messages.firstName = "First name is required";
    }

    if (!userDetails.lastName.trim()) {
      errors.lastName = true;
      messages.lastName = "Last name is required";
    }

    const validCountryCodes = [44, 91];

    if (!validCountryCodes.includes(userDetails.countryCode)) {
      errors.countryCode = true;
      messages.countryCode = "Sorry, currently only available in India and UK";
    }

    if (!userDetails.phone) {
      errors.phone = true;
      messages.phone = "Please enter a valid phone number";
    }

    if (!userDetails.houseNumber.trim()) {
      errors.houseNumber = true;
      messages.houseNumber = "Please enter house number";
    }

    if (!userDetails.streetName) {
      errors.streetName = true;
      messages.streetName = "Please enter your street name";
    }

    const validCountryIDs = [101, 232]; // 101 - India, 232 - UK

    if (!validCountryIDs.includes(country.id)) {
      errors.country = true;
      messages.country = "Sorry, currently only available in India and UK";
    }

    if (!userDetails.state) {
      errors.state = true;
      messages.state = "Please select a state";
    }

    if (!userDetails.city.trim()) {
      errors.city = true;
      messages.city = "Please select a city";
    }

    if (!userDetails.pincode.trim()) {
      errors.pincode = true;
      messages.pincode = "Please enter your pincode";
    }

    setUserDetailsValidity((prev) => ({
      ...prev,
      ...errors,
    }));

    setValidationMessage((prev) => ({
      ...prev,
      ...messages,
    }));

    return Object.values(errors).every((error) => !error);
  };

  const order = ["plan", "details", "interests"];

  const goToNextTab = () => {
    const currentIndex = order.indexOf(activeTab);
    const nextTab = order[currentIndex + 1];

    if (currentIndex === 1) {
      const isValid = validateUserDetails();

      if (isValid) {
        setActiveTab(nextTab);
      }
    } else {
      if (nextTab) {
        setActiveTab(nextTab);
      }
    }
  };

  const goBack = () => {
    const currentIndex = order.indexOf(activeTab);
    const prevTab = order[currentIndex - 1];

    if (prevTab) {
      setActiveTab(prevTab);
    }
  };

  const handleTabSelect = (key: string) => {
    const currentIndex = order.indexOf(activeTab);
    if (currentIndex === 1) {
      if (order.indexOf(key) < currentIndex) setActiveTab(key);
      else {
        if (validateUserDetails()) {
          setActiveTab(key);
        }
      }
    } else {
      setActiveTab(key);
    }
  };

  return (
    <main className="dy-onboard-main-container">
      {/*--------------------------- Header Section ---------------------------*/}

      <Header setOpenAuthModal={setOpenAuthModal} backgroundTheme="dark" />

      {/*--------------------------- Authentication Section ---------------------------*/}

      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      {/*--------------------------- Hero Section ---------------------------*/}
      <section className="dy-onboard-hero">
        <h1>Dear You,</h1>
        <h2>From The Artwork Labs</h2>
      </section>

      {/*--------------------------- Form Section ---------------------------*/}

      <section className="dy-onboard-form">
        <Tabs
          className="dy-tabs-container"
          selectedKey={activeTab}
          onSelectionChange={(key) => handleTabSelect(key.toString())}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options" className="dy-tabs">
              <Tabs.Tab id="plan" className="dy-tab">
                Plan
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="details" className="dy-tab">
                Details
                <Tabs.Indicator className="dy-tab" />
              </Tabs.Tab>
              <Tabs.Tab id="interests" className="dy-tab">
                Interests
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          {/*--------------------------- Plan Selection Tab ---------------------------*/}

          <Tabs.Panel className="pt-4" id="plan">
            <div className="dy-onboard-tab-container">
              <p className="tab-heading">Choose your experience</p>
              <div className="dy-plans-container">
                <PricePlanItem
                  heading="One letter"
                  frequency="per month"
                  price="£3.66"
                  isFirstFree={true}
                  isPopular={false}
                  selected={selectedPlan === 1}
                  selectedPlan={setSelectedPlan}
                  planID={1}
                />
                <PricePlanItem
                  heading="Two letter"
                  frequency="per month"
                  price="£6"
                  isFirstFree={true}
                  isPopular={false}
                  selected={selectedPlan === 2}
                  selectedPlan={setSelectedPlan}
                  planID={2}
                />
                <PricePlanItem
                  heading="Three letter"
                  frequency="per month"
                  price="£8.66"
                  isFirstFree={true}
                  isPopular={true}
                  selected={selectedPlan === 3}
                  selectedPlan={setSelectedPlan}
                  planID={3}
                />
                <PricePlanItem
                  heading="One time letter"
                  frequency="single letter"
                  price="£4"
                  isFirstFree={false}
                  isPopular={false}
                  selected={selectedPlan === 4}
                  selectedPlan={setSelectedPlan}
                  planID={4}
                />
              </div>
            </div>
          </Tabs.Panel>

          {/*--------------------------- Details Tab ---------------------------*/}

          <Tabs.Panel className="pt-4" id="details">
            <div className="dy-onboard-tab-container">
              <div className="flex flex-col items-center gap-1">
                {/* <p className="tab-heading">Tell us about you</p> */}
                <p className="user-details-message">
                  Fill the form, so we know where to send your letters and who
                  to address them to.
                </p>
                <span className="flex items-center gap-0 relative justify-center mt-2">
                  <DotLottieReact
                    src={"/Animations/secured.json"}
                    autoplay
                    className="secure-animation"
                  />
                  <p className="secure-message">
                    Your details are completely confidential and securely stored
                    and will never be shared.
                  </p>
                </span>
              </div>
              <div className="details-form-container">
                <span className="name-container">
                  <TextField
                    isRequired
                    className="max-w-[180px]"
                    name="firstName"
                    isInvalid={userDetailsValidity.firstName}
                  >
                    <Label className="dy-input-label">First Name</Label>
                    <InputGroup>
                      <InputGroup.Input
                        className="max-w-[180px] placeholder"
                        placeholder="First name"
                        value={userDetails.firstName}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.firstName}</FieldError>
                  </TextField>

                  <TextField
                    className="max-w-[180px]"
                    name="lastName"
                    isRequired
                    isInvalid={userDetailsValidity.lastName}
                  >
                    <Label className="dy-input-label">Last Name</Label>
                    <InputGroup>
                      <InputGroup.Input
                        className="max-w-[180px] placeholder"
                        placeholder="Last name"
                        value={userDetails.lastName}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.lastName}</FieldError>
                  </TextField>
                </span>

                <TextField className="max-w-[250px]" name="email">
                  <Label className="dy-input-label">Email</Label>
                  <InputGroup>
                    <InputGroup.Prefix>
                      <Envelope className="size-4 text-muted dy-input-prefix" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      className="max-w-[220px] placeholder"
                      placeholder="example@gmail.com"
                      type="email"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </TextField>

                <span className="name-container">
                  <TextField
                    className="max-w-[120px]"
                    name="countryCode"
                    isRequired
                    isInvalid={userDetailsValidity.countryCode}
                  >
                    <Label className="dy-input-label">Country code</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <Plus className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        className="max-w-[100px] placeholder"
                        placeholder="44"
                        type="number"
                        value={userDetails.countryCode}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            countryCode: Number(e.target.value),
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.countryCode}</FieldError>
                  </TextField>

                  <TextField
                    className="max-w-[230px]"
                    name="phone"
                    isRequired
                    isInvalid={userDetailsValidity.phone}
                  >
                    <Label className="dy-input-label">Phone</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <Handset className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        className="max-w-[150px] placeholder"
                        placeholder="01234567890"
                        type="number"
                        value={userDetails.phone}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            phone: Number(e.target.value),
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.phone}</FieldError>
                  </TextField>
                </span>

                <div className="address-container">
                  <TextField
                    className="max-w-[300px]"
                    name="houseNumber"
                    isRequired
                    isInvalid={userDetailsValidity.houseNumber}
                  >
                    <Label className="dy-input-label">Address</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <House className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        className="max-w-[300px] placeholder"
                        placeholder="House number, building number"
                        type="text"
                        value={userDetails.houseNumber}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            houseNumber: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.houseNumber}</FieldError>
                  </TextField>

                  <TextField
                    className="max-w-[300px]"
                    name="street"
                    isRequired
                    isInvalid={userDetailsValidity.streetName}
                  >
                    <Label className="dy-input-label">Street</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <TrafficLight className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        className="max-w-[300px] placeholder"
                        placeholder="Street name"
                        type="text"
                        value={userDetails.streetName}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            streetName: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.streetName}</FieldError>
                  </TextField>

                  <TextField
                    name="country"
                    isRequired
                    isInvalid={userDetailsValidity.country}
                  >
                    <Label className="dy-input-label">Country</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <Globe className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <CountrySelect
                        onChange={(e) => {
                          if ("name" in e) {
                            setCountry({
                              countryName: e.name,
                              id: e.id,
                            });
                            setUserDetails({
                              ...userDetails,
                              country: e.name,
                            });
                          }
                        }}
                        placeHolder="Country"
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.country}</FieldError>
                  </TextField>

                  <TextField
                    name="state"
                    isRequired
                    isInvalid={userDetailsValidity.state}
                  >
                    <Label className="dy-input-label">State</Label>
                    <InputGroup isDisabled={country.id === 0}>
                      <StateSelect
                        countryid={country.id}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(e) => {
                          if ("name" in e) {
                            setState({
                              stateName: e.name,
                              id: e.id,
                            });
                            setUserDetails({
                              ...userDetails,
                              state: e.name,
                            });
                          }
                        }}
                        placeHolder="State"
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.state}</FieldError>
                  </TextField>

                  <TextField
                    name="city"
                    isRequired
                    isInvalid={userDetailsValidity.city}
                  >
                    <Label className="dy-input-label">City</Label>
                    <InputGroup isDisabled={state.id === 0}>
                      <CitySelect
                        countryid={country.id}
                        stateid={state.id}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(e) => {
                          if ("name" in e) {
                            setState({
                              stateName: e.name,
                              id: e.id,
                            });
                            setUserDetails({
                              ...userDetails,
                              city: e.name,
                            });
                          }
                        }}
                        placeHolder="State"
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.city}</FieldError>
                  </TextField>

                  <TextField
                    className="max-w-[230px]"
                    name="pincode"
                    isRequired
                    isInvalid={userDetailsValidity.pincode}
                  >
                    <Label className="dy-input-label">Pincode</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <MapPin className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        className="max-w-[150px] placeholder"
                        placeholder="DD1 2EX"
                        type="text"
                        value={userDetails.pincode}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <FieldError>{validationMessage.pincode}</FieldError>
                  </TextField>

                  <Button variant="ghost" className={"link"}>
                    Outside UK or India?
                  </Button>
                  {/* TODO: Add function */}
                </div>

                <TextField className="w-full" name="deliveryInstructions">
                  <Label className="dy-input-label">
                    Delivery Instructions
                  </Label>
                  <InputGroup>
                    <InputGroup.TextArea
                      className="w-full placeholder"
                      placeholder="Any delivery related instructions can be written here"
                      value={userDetails.deliveryInstructions}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          deliveryInstructions: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </TextField>
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="interests">
            <p>Generate and download detailed reports.</p>
          </Tabs.Panel>
        </Tabs>
        <div className="w-full flex justify-between px-2">
          {activeTab !== "d" && (
            <Button onClick={goBack}>
              <ArrowLeft />
              <p>back</p>
            </Button>
          )}
          {activeTab !== "interests" && (
            <Button onClick={goToNextTab}>
              <p>Continue</p>
              <ArrowRight />
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
