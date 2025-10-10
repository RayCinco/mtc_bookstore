import { useState, useEffect } from "react";
import Header from "../../components/Header";
import ContactContent from "./contactComponents/ContactContent";
function ContactMenu() {
  return (
    <>
      <Header title="Contact Us" showBreadcrumb={true} />
      <ContactContent />
    </>
  );
}

export default ContactMenu;
