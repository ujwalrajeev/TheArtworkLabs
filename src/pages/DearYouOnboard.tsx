import "./DearYouOnboard.scss";
import Header from "../components/Header";
import AuthenticationModal from "../components/AuthenticationModal";
import { useRef, useState } from "react";
import { scrollTo } from "../utils/tal-utils";
import { useAuthStore } from "../utils/state-machine";
import { auth } from "../config/firebase-config";
import { saveOnboardingData } from "../services/firestore";
import {
  Button,
  Tabs,
  InputGroup,
  Label,
  TextField,
  FieldError,
  TagGroup,
  Tag,
  Selection,
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
  LifeRing,
} from "@gravity-ui/icons";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Footer from "../components/Footer";
import FullScreenMessage from "../components/FullScreenMessage";

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
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  type UserDetailsValidity = {
    firstName: boolean;
    lastName: boolean;
    dob: boolean;
    gender: boolean;
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

  type UserInterestData = {
    currentEvents: string;
    specialDates: string;
    otherData: string;
  };

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
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
      dob: false,
      gender: false,
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
      dob: "",
      gender: "",
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

  const [interests, setInterests] = useState<string[]>([
    "Art",
    "Music",
    "DIY",
    "Travel",
    "Cooking",
    "Cinema",
    "Gaming",
    "Sports",
    "Technology",
    "Fashion",
    "Fitness",
    "Photography",
    "Writing",
    "Reading",
    "Gardening",
    "Animals",
  ]);
  const [selectedInterests, setSelectedInterests] = useState<Selection>(
    new Set([]),
  );
  const [interestData, setInterestData] = useState<UserInterestData>({
    currentEvents: "",
    specialDates: "",
    otherData: "",
  });

  const [interestInput, setInterestInput] = useState("");
  const [interestValidation, setInterestValidation] = useState(true);
  const interestsRef = useRef<HTMLDivElement>(null);

  const [authType, setAuthType] = useState<"signup" | "login">("login");
  const [showFullScreenMessage, setShowFullScreenMessage] = useState(false);

  //---------------------------------Validation--------------------------------------

  const validateUserDetails = () => {
    const errors: UserDetailsValidity = {
      firstName: false,
      lastName: false,
      dob: false,
      gender: false,
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
      dob: "",
      gender: "",
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

    if (!userDetails.dob.trim()) {
      errors.dob = true;
      messages.dob = "Date of birth is required";
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

    if (!userDetails.gender) {
      errors.gender = true;
      messages.gender = "Please enter your gender";
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
    } else if (currentIndex === 2) {
      if (selectedInterests !== "all" && selectedInterests.size >= 5) {
        setActiveTab(nextTab);
        setInterestValidation(true);
        storeData();
      } else {
        scrollTo(interestsRef);
        setInterestValidation(false);
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

  const storeData = async () => {
    const user = auth.currentUser;
    const onboardingData = {
      userDetails,
      selectedPlan,
      selectedInterests:
        selectedInterests === "all"
          ? []
          : Array.from(selectedInterests).map(String),
      interestData,
    };

    if (!user) {
      alert("Please login again to continue");
      return;
    }

    try {
      await saveOnboardingData(user.uid, onboardingData);

      console.log("Onboarding data saved successfully!");

      // Navigate to next page if needed
      // navigate("/dashboard");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    }
  };

  return (
    <main className="dy-onboard-main-container">
      {/*--------------------------- Header Section ---------------------------*/}

      <Header setOpenAuthModal={setOpenAuthModal} backgroundTheme="dark" />

      {/*--------------------------- Full Screen Message ---------------------------*/}

      {showFullScreenMessage && (
        <FullScreenMessage
          type="General"
          title="Why do we need you to login or sign up?"
          message="We need you to login or sign up to ensure that your personal information and
           preferences are securely stored. This allows us to provide a personalized experience, 
           keep track of your interactions, and offer you the best possible service. 
           Your privacy is important to us, and we are committed to protecting your data."
          show={setShowFullScreenMessage}
          closeButton={{ text: "Close" }}
        />
      )}

      {/*--------------------------- Authentication Section ---------------------------*/}

      {openAuthModal && (
        <AuthenticationModal
          setOpenAuthModal={setOpenAuthModal}
          authType={authType}
        />
      )}

      {/*--------------------------- Hero Section ---------------------------*/}

      <section className="dy-onboard-hero">
        <h1>Dear You,</h1>
        <h2>From The Artwork Labs</h2>
      </section>

      {/*--------------------------- Form Section ---------------------------*/}
      {isLoggedIn && (
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
                <span className="secure-message-container gap-2 !mt-0">
                  <LifeRing className="w-4 h-4 text-[var(--dy-paper-text-body)]" />
                  <span className="flex items-center gap-1">
                    <p className="text-[0.9rem] !pl-0">Need help?</p>
                    {/*TODO: Implement contact functionality */}
                    <p className="text-[0.9rem] font-bold cursor-pointer text-[var(--pastel-terracotta-light)]">
                      Contact us
                    </p>
                  </span>
                </span>
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
                  <span className="secure-message-container">
                    <DotLottieReact
                      src={"/Animations/secured.json"}
                      autoplay
                      className="secure-animation"
                    />
                    <p className="secure-message">
                      Your details are completely confidential and securely
                      stored and will never be shared.
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
                              fullName:
                                userDetails.firstName + " " + e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <FieldError>{validationMessage.lastName}</FieldError>
                    </TextField>
                  </span>

                  <span className="name-container">
                    <TextField
                      className="max-w-[250px]"
                      name="dob"
                      isRequired
                      isInvalid={userDetailsValidity.dob}
                    >
                      <Label className="dy-input-label">Date of Birth</Label>
                      <InputGroup>
                        <InputGroup.Input
                          className="max-w-[220px]"
                          type="date"
                          value={userDetails.dob}
                          onChange={(e) =>
                            setUserDetails({
                              ...userDetails,
                              dob: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <FieldError>{validationMessage.dob}</FieldError>
                    </TextField>

                    <TextField
                      className="max-w-[250px]"
                      name="gender"
                      isRequired
                      isInvalid={userDetailsValidity.gender}
                    >
                      <Label className="dy-input-label">Gender</Label>
                      <InputGroup>
                        <InputGroup.Input
                          className="max-w-[185px]"
                          type="text"
                          value={userDetails.gender}
                          onChange={(e) =>
                            setUserDetails({
                              ...userDetails,
                              gender: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <FieldError>{validationMessage.gender}</FieldError>
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

            {/*--------------------------- Interests Tab ---------------------------*/}
            <Tabs.Panel className="pt-4" id="interests">
              <div className="dy-onboard-tab-container">
                <div className="flex flex-col items-center gap-1">
                  <p className="tab-heading">Tell us about you</p>
                  <p className="user-interests-message">
                    The more you share, the more personal your letters will
                    feel. Your writer will read every word of this.
                  </p>
                </div>
                <div className="interests-section-container" ref={interestsRef}>
                  <span className="flex gap-1 items-center">
                    <p className="interest-label-main">What do you love?</p>
                    <p className="interest-label-sub">
                      {
                        "Pick atleast 5 interests from the list below, or add your own."
                      }
                    </p>
                  </span>
                  <TagGroup
                    aria-label="Select your interests"
                    selectedKeys={selectedInterests}
                    selectionMode="multiple"
                    onSelectionChange={(keys) => {
                      setSelectedInterests(keys);
                    }}
                  >
                    <TagGroup.List className="flex flex-wrap gap-2 items-center">
                      {interests.map((interest) => (
                        <Tag
                          key={interest}
                          id={interest}
                          className={
                            "tag" +
                            (selectedInterests !== "all" &&
                            selectedInterests.has(interest)
                              ? " tag-selected"
                              : "")
                          }
                        >
                          {interest}
                        </Tag>
                      ))}
                    </TagGroup.List>
                  </TagGroup>

                  <span className="flex gap-2 items-center flex-wrap">
                    <p className="interest-label-sub">
                      {
                        "More interests? Add as many you want by typing below separated by comma."
                      }
                    </p>
                  </span>
                  <TextField
                    className="w-full"
                    name="interests"
                    isRequired
                    isInvalid={!interestValidation}
                    aria-label="add your interests"
                  >
                    <InputGroup>
                      <InputGroup.TextArea
                        className="w-full placeholder"
                        placeholder="e.g. Magic, Doodling, Fishing"
                        value={interestInput}
                        onChange={(e) => {
                          const value = e.target.value;
                          setInterestInput(value);

                          if (value.includes(",")) {
                            const parts = value.split(",");

                            const completed = parts.slice(0, -1);
                            const remaining = parts[parts.length - 1];

                            completed.forEach((item) => {
                              const tag = item.trim();

                              if (!tag) return;

                              // Add to available interests
                              setInterests((prev) => {
                                if (prev.includes(tag)) return prev;
                                return [...prev, tag];
                              });

                              // Select the tag
                              setSelectedInterests((prev) => {
                                if (prev === "all") return prev;

                                const next = new Set(prev);
                                next.add(tag);
                                return next;
                              });
                            });

                            setInterestInput(remaining);
                          }
                        }}
                      />
                    </InputGroup>
                    <FieldError>Please select at least 5 interests</FieldError>
                  </TextField>
                </div>
                <div className="interests-section-container">
                  <span className="flex gap-2 items-center flex-wrap">
                    <p className="interest-label-main">
                      What's something happening in your life right now?
                    </p>
                    <p className="interest-label-sub">
                      {"(optional) This makes your letter feel truly magical"}
                    </p>
                  </span>
                  <TextField
                    className="w-full"
                    name="interests"
                    aria-label="current life events"
                  >
                    <InputGroup>
                      <InputGroup.TextArea
                        className="w-full placeholder min-h-[100px]"
                        placeholder="A new chapter, a quiet season, something you're looking forward to... no detail is too small"
                        value={interestData.currentEvents}
                        onChange={(e) => {
                          setInterestData({
                            ...interestData,
                            currentEvents: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </TextField>
                </div>

                <div className="interests-section-container">
                  <span className="flex gap-2 items-center flex-wrap">
                    <p className="interest-label-main">
                      Any special dates we should know about?
                    </p>
                    <p className="interest-label-sub">
                      {"(optional) Sometimes you may get some surprise letters"}
                      on these dates, so we can make them extra special
                    </p>
                  </span>
                  <TextField
                    className="w-full"
                    name="interests"
                    aria-label="important dates"
                  >
                    <InputGroup>
                      <InputGroup.TextArea
                        className="w-full placeholder min-h-[100px]"
                        placeholder="e.g. birthdays, anniversaries, important days - we'll remember them"
                        value={interestData.specialDates}
                        onChange={(e) => {
                          setInterestData({
                            ...interestData,
                            specialDates: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </TextField>
                </div>

                <div className="interests-section-container">
                  <span className="flex gap-2 items-center flex-wrap">
                    <p className="interest-label-main">
                      Anything else your letter writer should know?
                    </p>
                    <p className="interest-label-sub">{"(optional)"} </p>
                  </span>
                  <TextField
                    className="w-full"
                    name="interests"
                    aria-label="other information for letter writer"
                  >
                    <InputGroup>
                      <InputGroup.TextArea
                        className="w-full placeholder min-h-[100px]"
                        placeholder="Anything else you want to share with your letter writer, so they can make your letters feel truly personal"
                        value={interestData.otherData}
                        onChange={(e) => {
                          setInterestData({
                            ...interestData,
                            otherData: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </TextField>
                </div>
              </div>
            </Tabs.Panel>
          </Tabs>
          <div
            className={
              "w-full flex px-2" +
              (activeTab === "plan" ? " justify-end" : " justify-between")
            }
          >
            {activeTab !== "plan" && (
              <Button onClick={goBack}>
                <ArrowLeft />
                <p>back</p>
              </Button>
            )}
            {activeTab !== "" && (
              <Button onClick={goToNextTab}>
                <p>Continue</p>
                <ArrowRight />
              </Button>
            )}
          </div>
        </section>
      )}

      {!isLoggedIn && (
        <div className="dy-onboard-login-container">
          <p className="login-heading">Welcome to Dear You,</p>
          <p className="login-message">
            Please login or sign up to continue with the onboarding process.
          </p>
          <span className="flex gap-2 items-center">
            <Button
              variant="primary"
              onClick={() => {
                setAuthType("login");
                setOpenAuthModal(true);
              }}
            >
              Login
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setAuthType("signup");
                setOpenAuthModal(true);
              }}
            >
              Sign Up
            </Button>
          </span>
          <Button
            variant="ghost"
            className="link"
            onClick={() => setShowFullScreenMessage(true)}
          >
            Why need to login or sign up?
          </Button>
          <span className="flex gap-2 !mt-0 items-center border-[1px] border-[var(--dy-paper-text-body)] px-3 py-2 rounded-md">
            <LifeRing className="w-4 h-4 text-[var(--dy-paper-text-body)]" />
            <span className="flex items-center gap-1">
              <p className="text-[0.9rem] !pl-0">Need help?</p>
              {/*TODO: Implement contact functionality */}
              <p className="text-[0.9rem] font-bold cursor-pointer text-[var(--pastel-terracotta-light)]">
                Contact us
              </p>
            </span>
          </span>
        </div>
      )}

      {/*--------------------------- Footer Section ---------------------------*/}

      <Footer backgroundTheme="dark" />
    </main>
  );
}
