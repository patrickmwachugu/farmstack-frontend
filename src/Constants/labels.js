const labels = {
  en: {
    common: {
      submit: "Submit",
      cancel: "Cancel",
      update: "Update",
      back: "Back",
      finishLater: "Finish later",
    },
    login: {
      signup_header: "Let's build a datahub together",
    },
    navbar: {
      Participants: "Participants",
      NetworkActivity: "Network Activity",
      Support: "Support",
      datasets: "Datasets",
      connectors: "Connectors",
      Settings: "Settings",
      Signout: "Sign out",
      Signin: "Sign In",
      helpline: "1800 1100 1200 1912",
      legal: "Legal",
      contact: "Contact",
      apply_for_participant: "Apply for Participant",
      Dashboard: "Dashboard",
    },
    addparticipants: {
      first_heading: "Add Participants organisation details",
      second_heading: "Add Participants root user details",
      third_heading: "Add Participant's subscription length to the datahub",
      organisation_name: "Organisation Name",
      email: "Email Id",
      website_link: "Website Link",
      organisation_address: "Organisation Address",
      country: "Country",
      pincode: "Pincode",
      first_name: "First Name",
      last_name: "Last Name",
      contact_number: "Contact Number",
      subscripiton_length: "Subscription Length",
      firstText: "Add new Participant",
      secondText:
        "Add details about your dataset and make discoverable to other participants in our network. “Dummy Data”",
    },
    editparticipants: {
      first_heading: "Edit Participants Organisation Details",
      second_heading: "Edit Participants Root User Details",
      third_heading: "Edit Participant's Subscription Length to the Datahub",
    },
    viewparticipants: {
      first_heading: "Participant organisation details",
      second_heading: "Participant root user details",
      third_heading: "Participant's subscription length to the datahub",
      organisation_name: "Organisation Name",
      email: "Email",
      website_link: "Website Link",
      organisation_address: "Organisation Address",
      country: "Country",
      pincode: "PIN code",
      first_name: "First Name",
      last_name: "Last Name",
      contact_number: "Contact Number",
      subscripiton_length: "Subscription Length",
      delete_participant: "Delete Participants",
      delete_msg: "Are you sure you want to delete the participant?",
      second_delete_msg:
        "This action will delete the participant’s account from the system including her organisation details, users, datasets and connectors.",
      third_delete_msg:
        "The participant will no longer be able to use her account in the datahub.",
    },
    inviteParticipants: {
      first_heading: "Invite participants",
      second_heading: "Invite message",
    },
    settings: {
      heading: "Add new member",
      editheading: "Edit member details",
      email: "Email id",
      first_name: "First name",
      last_name: "Last name",
      role: "Role",
      delete_member: "Delete Member",
      delete_msg: "Are you sure you want to delete the team member?",
      second_delete_msg:
        "This action will delete the member’s account from the system.",
      third_delete_msg:
        "The member's account will no longer be usable in the datahub.",
      firstText: "Add new member",
      secondText:
        "Add details about your dataset and make it discoverable to other users of our network.",
    },
    account_settings: {
      email: "Email",
      first_name: "First name",
      last_name: "Last name",
      contact: "Contact number",
    },
    org_settings: {
      email: "Organisation Mail ID",
      org_name: "Organisation name",
      address: "Organisation address",
      contact: "Organisation contact number",
      city: "City",
      pincode: "PIN code",
      org_des: "Organisation description",
      website: "Organisation website *",
    },

    support: {
      heading: "List of Tickets",
      filter: "Filter",
      all: "All",
      Status: "Status",
      Category: "Category",
      open_status: "Open Status",
      close_status: "Close Status",
      hold_status: "Hold Status",
      User_Accounts: "User Accounts",
      Datasets: "Datasets",
      Usage_Policy: "Usage Policy",
      Certificate: "Certificate",
      Connectors: "Connectors",
      Others: "Others",
      date: "By Date",
    },
    sessiontimeout: {
      heading: "Session has expired",
      secondmainheading: "Oops!",
      thirdmainheading: "Your login session has expired, please sign in again.",
    },
    error: {
      heading: "Oops!",
      secondmainheading: "Someting went wrong!",
      thirdmainheading:
        "Please try again later or contact to support@farmstack.co",
    },
    dataset: {
      name: "Dataset name",
      description: "Description *",
      Data_Category: "Data category *",
      Crop_data: "Crop data",
      Practice_data: "Practice data",
      Farmer_profile: "Farmer profile",
      Land_records: "Land records",
      Cultivation_data: "Cultivation data",
      Soil_data: "Soil data",
      Weather_data: "Weather data",
      Research_data: "Research data",
      Geography: "Geography",
      Crop_Detail: "Crop details",
      data: "Actual age of data",
      Constantly_updating: "Constantly updating",
      three: "3 months",
      six: "6 months",
      nine: "9 months",
      twelve: "12 months",
      Interval: "Data capture interval",
      Start_Date: "Start date ",
      End_Date: "End date ",
      Records: " Size of actual data (records)",
      Availablity: "Connector availablity",
      Available: "Available",
      Not_Available: "Not available",
      Upload_dataset: " Upload Sample Datasets *",

      filter: "Filter",
      geography: "Geography",
      age: "Age",
      crop: "Crop",
      search: "Search",
      datasets: "Datasets",
      enabled: "Enabled",
      disbaled: "Disabled",
      status: "Status",
      for_review: "For Review",
      rejected: "Rejected",
      approved: "Approved",
      organisation_name: "Organization name",
      published_on: "Published on",
      age_of_data: "Age of data",
      crop_details: "Crop details",
      add_dataset: "Add new dataset",
      add_dataset_text:
        "Add details about your dataset and make it discoverable to other users of our network.",
      no_dataset_text1: "Currently, there are no datasets available.",
      no_dataset_text2: "Add your dataset.",
    },
    dashboard: {
      organisation_details: "Organisation Details",
      add_team_members: "Add team members",
      invite_members: "Invite members",
      update_branding_details: "Update branding details",
      to_do_list: "To do list",
      total_no_of_participants: "Total no. of participants",
      total_no_of_datasets: "Total no. of datasets",
      total_no_of_active_connectors: "Total no. of active connectors",
      total_amount_of_data_exchange: "Total amount of data exchange",
      datasets_title: "Datasets",
      dataset_category: "Dataset Category",
      data_exchange_trends: "Data Exchange Trends",
      support_request: " Support Request",
      connector_statics: "Connector Statics",
      period: "Period",
      day: "Day",
      month: "Month",
      yearly: "Yearly",
      week: "Week",
      no_data_available: "There is no data at this moment!",
    },
    connector: {
      filter: "Filter",
      department: "Department",
      projects: "Projects",
      connector_type: "Connector type",
      connector_status: "Connector status",
      search: "Search",

      project: "Project",
      status: "Status",
      connector_name: "Connector name",
      project_name: "Project name",
      department_name: "Department name",
      configure_connector: "Configure a new connector",
      configure_connector_text:
        "Configure a new connector to provide and consume data securely.",
      no_connector_text1: "Currently, there are no connectors available.",
      no_connector_text2: "Configure new connector.",
      no_dataset_text1:
        "You have not created a dataset for which you can create a connector",
      click_here: "Click Here",
      no_dataset_text2: " to get started!",

      status_install_certificate: "install certificate",
      status_unpaired: "unpaired",
      status_awaiting_approval: "awaiting for approval",
      status_paired: "paired",
      status_pairing_request_received: "pairing request received",
      status_rejected: "rejected",
    },
    guestUser: {
      contact_us: "Contact Us",
      touch_with_us: "Touch with us",
      datahub_admin_name: "Datahub admin name",
      datahub_admin_email: "Datahub admin email",
      datahub_admin_phone: "Datahub admin phone",
      organization_name: " Organization name",
      country: "Country",
      city: "City",
      address: "Address",
      pin_code: "PIN Code",
      email: "Email",
      phone: "Phone",
      website: "Website",
      say_hello: "Say Hello!",
      first_name: "First Name",
      last_name: "Last Name",
      contact_number: "Contact Number",
      subject: "Subject",
      become_a_participant: "Become a Participant ( Data Provider / Consumer )",
      other_queries: "Other queries ( Describe your query in detail )",
      describe_your_query: "Describe your query",
      submit: "Submit",
      cancel: "Cancel",
    },
    connector_form: {
      connectorType: " Connector type * ",
      selectDataset: "Select dataset *",
      connectorName: "Connector name ",
      addDepartment: " + Add department",
      addProject: " + Add project ",
      selectDepartment: "  Select department ",
      selectProject: " Select project ",
      docker: "Docker image url  ",
      port: "Application port ",
      des: "Description",
      submit: "Save and request certificate",
    },
    pair_with_component: {
      pair_with: "Pair with",
      connector_name: "Connector Name",
      connector_type: "Connector Type",
      dataset_name: "Dataset Name",
      department_name: "Department Name",
      project_name: "Project Name",
      certificate_status: "Certificate Status",
      docker_image_url: "Docker Image url",
      application_port: "Application Port",
      hash_usage_policy: "Hash (usage Policy)",
      participant_org_name: "Participant organisation name",
      participant_org_website: "Participant organisation website",
      send_pairing_request: "Send Pairing Request",
      cancel: "Cancel",
      select_provider_connector: "Select Provider Connector",
    },
    department: {
      heading: "Add a department",
      editheading: "Edit a department",
      department_name: "Department Name",
      description: "Department Description",
      department_description: "Description",
      delete_department: "Delete Department",
      delete_msg: "Are you sure, you want to delete the department?",
      second_delete_msg:
        "This action will delete the department from the system.",
      third_delete_msg:
        "The department will no longer be able to use in your acoount.",
      firstText: "Add new Department",
      secondText:
        "Add details about your dataset and make discoverable to other participants in our network.",
      editbutton: "Edit Department",
      deletebutton: "Delete Department",
      viewheading: "Department Details"
    },
  },
};
export default labels;
