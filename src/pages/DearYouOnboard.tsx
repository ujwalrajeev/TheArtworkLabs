import "./DearYouOnboard.scss";
import Header from "../components/Header";
import AuthenticationModal from "../components/AuthenticationModal";
import { useState } from "react";
import { Button, Tabs, InputGroup, Label, TextField } from "@heroui/react";
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
  const [country, setCountry] = useState<Country>({
    countryName: "",
    id: 0,
  });
  const [state, setState] = useState<State>({
    stateName: "",
    id: 0,
  });

  const goToNextTab = () => {
    const order = ["plan", "details", "interests"];

    const currentIndex = order.indexOf(activeTab);
    const nextTab = order[currentIndex + 1];

    if (nextTab) {
      setActiveTab(nextTab);
    }
  };

  const goBack = () => {
    const order = ["plan", "details", "interests"];

    const currentIndex = order.indexOf(activeTab);
    const prevTab = order[currentIndex - 1];

    if (prevTab) {
      setActiveTab(prevTab);
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
          onSelectionChange={(key) => setActiveTab(key.toString())}
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
                <p className="tab-heading">Tell us about you</p>
                <p className="text-[var(--dy-paper-text-body)] text-center text-[0.9rem]">
                  So we know where to send your letters and who to address them
                  to.
                </p>
              </div>
              <div className="details-form-container">
                <span className="name-container">
                  <TextField
                    isRequired
                    className="max-w-[180px]"
                    name="firstName"
                  >
                    <Label className="dy-input-label">First Name</Label>
                    <InputGroup>
                      <InputGroup.Input
                        className="max-w-[180px] placeholder"
                        placeholder="First name"
                      />
                    </InputGroup>
                  </TextField>

                  <TextField
                    className="max-w-[180px]"
                    name="lastName"
                    isRequired
                  >
                    <Label className="dy-input-label">Last Name</Label>
                    <InputGroup>
                      <InputGroup.Input
                        className="max-w-[180px] placeholder"
                        placeholder="Last name"
                      />
                    </InputGroup>
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
                    />
                  </InputGroup>
                </TextField>

                <span className="name-container">
                  <TextField
                    className="max-w-[120px]"
                    name="countryCode"
                    isRequired
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
                      />
                    </InputGroup>
                  </TextField>
                  <TextField className="max-w-[230px]" name="phone" isRequired>
                    <Label className="dy-input-label">Phone</Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <Handset className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        className="max-w-[150px] placeholder"
                        placeholder="01234567890"
                        type="number"
                      />
                    </InputGroup>
                  </TextField>
                </span>

                <div className="address-container">
                  <TextField
                    className="max-w-[300px]"
                    name="address"
                    isRequired
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
                      />
                    </InputGroup>
                  </TextField>

                  <TextField
                    className="max-w-[300px]"
                    name="address"
                    isRequired
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
                      />
                    </InputGroup>
                  </TextField>

                  <TextField>
                    <Label className="dy-input-label" isRequired>
                      Country
                    </Label>
                    <InputGroup>
                      <InputGroup.Prefix>
                        <Globe className="size-4 text-muted dy-input-prefix" />
                      </InputGroup.Prefix>
                      <CountrySelect
                        onChange={(value) => {
                          if ("name" in value) {
                            setCountry({
                              countryName: value.name,
                              id: value.id,
                            });
                          }
                        }}
                        placeHolder="Country"
                      />
                    </InputGroup>
                  </TextField>

                  <TextField>
                    <Label className="dy-input-label" isRequired>
                      State
                    </Label>
                    <InputGroup isDisabled={country.id === 0}>
                      <StateSelect
                        countryid={country.id}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(value) => {
                          if ("name" in value) {
                            setState({
                              stateName: value.name,
                              id: value.id,
                            });
                          }
                        }}
                        placeHolder="State"
                      />
                    </InputGroup>
                  </TextField>

                  <TextField>
                    <Label className="dy-input-label" isRequired>
                      City
                    </Label>
                    <InputGroup isDisabled={state.id === 0}>
                      <CitySelect
                        countryid={country.id}
                        stateid={state.id}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(value) => {
                          if ("name" in value) {
                            setState({
                              stateName: value.name,
                              id: value.id,
                            });
                          }
                        }}
                        placeHolder="State"
                      />
                    </InputGroup>
                  </TextField>

                  <TextField
                    className="max-w-[230px]"
                    name="pincode"
                    isRequired
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
                      />
                    </InputGroup>
                  </TextField>
                </div>

                <TextField className="w-full" name="firstName">
                  <Label className="dy-input-label">
                    Delivery Instructions
                  </Label>
                  <InputGroup>
                    <InputGroup.TextArea
                      className="w-full placeholder"
                      placeholder="Any delivery related instructions can be written here"
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
        <div className="w-full flex justify-between px-5">
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
