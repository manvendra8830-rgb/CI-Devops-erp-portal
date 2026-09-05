"use strict";

/* =========================================================
   EDUCORE ERP - CLEAN JAVASCRIPT
   ========================================================= */

/* =========================================================
   APPLICATION STATE
   ========================================================= */

const ERP = {
    currentPage: "dashboard",
    theme: localStorage.getItem("eduCoreTheme") || "light",

    students: [
        {
            id: "STU-2026-001",
            name: "Rahul Sharma",
            initials: "RS",
            course: "B.Tech CSE",
            semester: 5,
            attendance: 94,
            fees: "Paid",
            status: "Active",
            color: "blue"
        },
        {
            id: "STU-2026-002",
            name: "Aman Singh",
            initials: "AS",
            course: "BCA",
            semester: 3,
            attendance: 88,
            fees: "Pending",
            status: "Active",
            color: "purple"
        },
        {
            id: "STU-2026-003",
            name: "Priya Kumari",
            initials: "PK",
            course: "MBA",
            semester: 2,
            attendance: 91,
            fees: "Paid",
            status: "Pending",
            color: "orange"
        },
        {
            id: "STU-2026-004",
            name: "Rohit Verma",
            initials: "RV",
            course: "B.Tech CSE",
            semester: 7,
            attendance: 76,
            fees: "Pending",
            status: "Active",
            color: "blue"
        },
        {
            id: "STU-2026-005",
            name: "Neha Gupta",
            initials: "NG",
            course: "BBA",
            semester: 4,
            attendance: 97,
            fees: "Paid",
            status: "Active",
            color: "purple"
        },
        {
            id: "STU-2026-006",
            name: "Arjun Mehta",
            initials: "AM",
            course: "B.Sc",
            semester: 6,
            attendance: 84,
            fees: "Paid",
            status: "Graduated",
            color: "orange"
        },
        {
            id: "STU-2026-007",
            name: "Simran Kaur",
            initials: "SK",
            course: "B.Tech CSE",
            semester: 3,
            attendance: 93,
            fees: "Paid",
            status: "Active",
            color: "blue"
        },
        {
            id: "STU-2026-008",
            name: "Vikas Yadav",
            initials: "VY",
            course: "BCA",
            semester: 5,
            attendance: 72,
            fees: "Pending",
            status: "Active",
            color: "purple"
        }
    ],

    faculty: [
        {
            name: "Dr. Rajesh Sharma",
            role: "Professor",
            department: "Computer Science",
            subjects: "DBMS - Data Science",
            initials: "RS"
        },
        {
            name: "Dr. Priya Singh",
            role: "Associate Professor",
            department: "Management",
            subjects: "Finance - Economics",
            initials: "PS"
        },
        {
            name: "Prof. Amit Kumar",
            role: "Assistant Professor",
            department: "Computer Science",
            subjects: "Operating Systems - Networks",
            initials: "AK"
        },
        {
            name: "Dr. Neha Verma",
            role: "Professor",
            department: "Science",
            subjects: "Physics - Mathematics",
            initials: "NV"
        },
        {
            name: "Prof. Rahul Mehta",
            role: "Assistant Professor",
            department: "Management",
            subjects: "Marketing - Strategy",
            initials: "RM"
        },
        {
            name: "Dr. Anjali Gupta",
            role: "Professor",
            department: "Computer Science",
            subjects: "AI - Machine Learning",
            initials: "AG"
        }
    ]
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================================
   APPLICATION INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadStudents();

    initializeLoader();
    initializeTheme();
    initializeNavigation();
    initializeSidebar();
    initializeModal();
    initializeSearch();
    initializeKeyboardShortcuts();
    initializeQuickActions();
    initializeNotifications();
    initializeTimetable();
    initializeStudents();
    initializeFaculty();
    initializeChart();
    initializeLogout();
    initializeCounters();

});


/* =========================================================
   LOADER
   ========================================================= */

function initializeLoader() {

    const loader = $("#appLoader");

    if (!loader) {
        return;
    }

    window.setTimeout(function () {
        loader.classList.add("hide");
    }, 900);

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks = $$(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const page = link.getAttribute("data-page");

            if (page) {
                navigateTo(page);
            }

        });

    });


    const pageLinks = $$("[data-page-link]");

    pageLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const page = link.getAttribute("data-page-link");

            if (page) {
                navigateTo(page);
            }

        });

    });

}


function navigateTo(pageName) {

    if (!pageName) {
        return;
    }

    const targetPage = document.getElementById(pageName + "Page");

    if (!targetPage) {
        console.warn("Page not found:", pageName);
        return;
    }


    const pages = $$(".page");

    pages.forEach(function (page) {
        page.classList.remove("active-page");
    });


    const navLinks = $$(".nav-link");

    navLinks.forEach(function (link) {
        link.classList.remove("active");
    });


    targetPage.classList.add("active-page");


    const activeLink = document.querySelector(
        '.nav-link[data-page="' + pageName + '"]'
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }


    ERP.currentPage = pageName;


    const pageTitles = {
        dashboard: "Dashboard",
        students: "Students",
        faculty: "Faculty",
        departments: "Departments",
        attendance: "Attendance",
        exams: "Examinations",
        timetable: "Timetable",
        library: "Library",
        fees: "Fees & Payments",
        reports: "Reports",
        notifications: "Notifications",
        settings: "Settings"
    };


    const pageTitle = $("#pageTitle");

    if (pageTitle) {
        pageTitle.textContent =
            pageTitles[pageName] || "Dashboard";
    }


    closeSidebar();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageName === "students") {
        renderStudents();
    }


    if (pageName === "faculty") {
        renderFaculty();
    }

}


/* =========================================================
   SIDEBAR
   ========================================================= */

function initializeSidebar() {

    const menuBtn = $("#menuBtn");
    const sidebar = $("#sidebar");
    const overlay = $("#sidebarOverlay");


    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            if (sidebar) {
                sidebar.classList.toggle("open");
            }

            if (overlay) {
                overlay.classList.toggle("show");
            }

        });

    }


    if (overlay) {

        overlay.addEventListener("click", function () {
            closeSidebar();
        });

    }

}


function closeSidebar() {

    const sidebar = $("#sidebar");
    const overlay = $("#sidebarOverlay");


    if (sidebar) {
        sidebar.classList.remove("open");
    }


    if (overlay) {
        overlay.classList.remove("show");
    }

}


/* =========================================================
   THEME
   ========================================================= */

function initializeTheme() {

    applyTheme();


    const themeToggle = $("#themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {
            toggleTheme();
        });

    }


    const settingsTheme = $("#settingsTheme");

    if (settingsTheme) {

        settingsTheme.addEventListener("change", function () {
            toggleTheme();
        });

    }

}


function applyTheme() {

    const darkMode = ERP.theme === "dark";


    document.body.classList.toggle("dark", darkMode);


    const icon = $("#themeToggle i");

    if (icon) {

        if (darkMode) {
            icon.className = "fa-solid fa-sun";
        } else {
            icon.className = "fa-solid fa-moon";
        }

    }


    const settingsTheme = $("#settingsTheme");

    if (settingsTheme) {
        settingsTheme.checked = darkMode;
    }

}


function toggleTheme() {

    if (ERP.theme === "light") {
        ERP.theme = "dark";
    } else {
        ERP.theme = "light";
    }


    localStorage.setItem(
        "eduCoreTheme",
        ERP.theme
    );


    applyTheme();


    const message =
        ERP.theme === "dark"
            ? "Dark mode enabled."
            : "Light mode enabled.";


    showToast(
        "Theme Updated",
        message
    );

}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function initializeSearch() {

    const search = $("#globalSearch");
    const results = $("#searchResults");


    if (!search || !results) {
        return;
    }


    search.addEventListener("input", function (event) {

        const query = event.target.value
            .trim()
            .toLowerCase();


        if (!query) {

            results.innerHTML = "";
            results.classList.remove("show");

            return;
        }


        const pages = [
            {
                title: "Dashboard",
                type: "Navigation",
                icon: "fa-chart-pie",
                page: "dashboard"
            },
            {
                title: "Students",
                type: "Management",
                icon: "fa-user-graduate",
                page: "students"
            },
            {
                title: "Faculty",
                type: "Management",
                icon: "fa-chalkboard-user",
                page: "faculty"
            },
            {
                title: "Attendance",
                type: "Academic",
                icon: "fa-calendar-check",
                page: "attendance"
            },
            {
                title: "Examinations",
                type: "Academic",
                icon: "fa-file-lines",
                page: "exams"
            },
            {
                title: "Fees & Payments",
                type: "Finance",
                icon: "fa-wallet",
                page: "fees"
            },
            {
                title: "Library",
                type: "Management",
                icon: "fa-book",
                page: "library"
            },
            {
                title: "Reports",
                type: "Analytics",
                icon: "fa-chart-column",
                page: "reports"
            }
        ];


        const pageResults = pages.filter(function (item) {

            return item.title
                .toLowerCase()
                .includes(query);

        });


        const studentResults = ERP.students.filter(function (student) {

            return (
                student.name.toLowerCase().includes(query) ||
                student.id.toLowerCase().includes(query) ||
                student.course.toLowerCase().includes(query)
            );

        });


        results.innerHTML = "";


        pageResults.forEach(function (item) {

            const result = createSearchResult(
                item.title,
                item.type,
                item.icon
            );


            result.addEventListener("click", function () {

                navigateTo(item.page);

                search.value = "";

                results.classList.remove("show");

            });


            results.appendChild(result);

        });


        studentResults
            .slice(0, 5)
            .forEach(function (student) {

                const result = createSearchResult(
                    student.name,
                    student.course + " - " + student.id,
                    "fa-user-graduate"
                );


                result.addEventListener("click", function () {

                    navigateTo("students");

                    search.value = "";

                    results.classList.remove("show");

                });


                results.appendChild(result);

            });


        if (results.children.length === 0) {

            const noResult = document.createElement("div");

            noResult.className = "search-result";

            noResult.innerHTML =
                '<i class="fa-solid fa-circle-question"></i>' +
                '<div>' +
                '<strong>No results found</strong>' +
                '<span>Try another search term</span>' +
                '</div>';

            results.appendChild(noResult);

        }


        results.classList.add("show");

    });


    document.addEventListener("click", function (event) {

        const searchContainer =
            event.target.closest(".global-search");


        if (!searchContainer) {
            results.classList.remove("show");
        }

    });

}


function createSearchResult(
    title,
    subtitle,
    icon
) {

    const item = document.createElement("div");

    item.className = "search-result";


    const iconElement =
        document.createElement("i");

    iconElement.className =
        "fa-solid " + icon;


    const content =
        document.createElement("div");


    const titleElement =
        document.createElement("strong");

    titleElement.textContent = title;


    const subtitleElement =
        document.createElement("span");

    subtitleElement.textContent = subtitle;


    content.appendChild(titleElement);
    content.appendChild(subtitleElement);


    item.appendChild(iconElement);
    item.appendChild(content);


    return item;

}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function initializeKeyboardShortcuts() {

    document.addEventListener("keydown", function (event) {

        const modifier =
            event.ctrlKey || event.metaKey;


        if (
            modifier &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            const search = $("#globalSearch");

            if (search) {
                search.focus();
            }

        }


        if (
            modifier &&
            event.key.toLowerCase() === "n"
        ) {

            event.preventDefault();

            openStudentModal();

        }


        if (event.key === "Escape") {

            closeModal();

            closeSidebar();

        }

    });

}


/* =========================================================
   STUDENT SYSTEM
   ========================================================= */

function initializeStudents() {

    renderStudents();


    const studentSearch = $("#studentSearch");

    if (studentSearch) {

        studentSearch.addEventListener(
            "input",
            renderStudents
        );

    }


    const courseFilter = $("#courseFilter");

    if (courseFilter) {

        courseFilter.addEventListener(
            "change",
            renderStudents
        );

    }


    const statusFilter = $("#statusFilter");

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderStudents
        );

    }


    const selectAll = $("#selectAll");

    if (selectAll) {

        selectAll.addEventListener(
            "change",
            function (event) {

                const checkboxes =
                    document.querySelectorAll(
                        "#studentTableBody input[type='checkbox']"
                    );


                checkboxes.forEach(function (checkbox) {

                    checkbox.checked =
                        event.target.checked;

                });

            }
        );

    }


    const addStudentBtn = $("#addStudentBtn");

    if (addStudentBtn) {

        addStudentBtn.addEventListener(
            "click",
            openStudentModal
        );

    }


    const studentPageAddBtn =
        $("#studentPageAddBtn");

    if (studentPageAddBtn) {

        studentPageAddBtn.addEventListener(
            "click",
            openStudentModal
        );

    }

}


/* =========================================================
   RENDER STUDENTS
   ========================================================= */

function renderStudents() {

    const tableBody =
        $("#studentTableBody");


    if (!tableBody) {
        return;
    }


    const searchElement =
        $("#studentSearch");

    const courseElement =
        $("#courseFilter");

    const statusElement =
        $("#statusFilter");


    const search =
        searchElement
            ? searchElement.value.toLowerCase().trim()
            : "";


    const course =
        courseElement
            ? courseElement.value
            : "";


    const status =
        statusElement
            ? statusElement.value
            : "";


    const filteredStudents =
        ERP.students.filter(function (student) {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(search) ||
                student.id
                    .toLowerCase()
                    .includes(search) ||
                student.course
                    .toLowerCase()
                    .includes(search);


            const matchesCourse =
                !course ||
                student.course === course;


            const matchesStatus =
                !status ||
                student.status === status;


            return (
                matchesSearch &&
                matchesCourse &&
                matchesStatus
            );

        });


    tableBody.innerHTML = "";


    if (filteredStudents.length === 0) {

        tableBody.innerHTML =
            '<tr>' +
            '<td colspan="8">' +
            '<div style="padding:40px;text-align:center;">' +
            '<i class="fa-solid fa-user-slash"></i>' +
            '<p>No students found.</p>' +
            '</div>' +
            '</td>' +
            '</tr>';

        return;
    }


    filteredStudents.forEach(function (student) {

        const row =
            document.createElement("tr");


        const attendanceColor =
            student.attendance < 75
                ? "var(--danger)"
                : "var(--success)";


        let feeClass = "pending";

        if (student.fees === "Paid") {
            feeClass = "active";
        }


        let statusClass = "active";

        if (student.status === "Pending") {
            statusClass = "pending";
        }

        if (student.status === "Graduated") {
            statusClass = "completed";
        }


        row.innerHTML =
            '<td>' +
            '<input type="checkbox" value="' +
            escapeHTML(student.id) +
            '">' +
            '</td>' +

            '<td>' +
            '<div class="table-user">' +

            '<div class="avatar avatar-' +
            escapeHTML(student.color) +
            '">' +
            escapeHTML(student.initials) +
            '</div>' +

            '<div>' +
            '<strong>' +
            escapeHTML(student.name) +
            '</strong>' +

            '<span>' +
            escapeHTML(student.id) +
            '</span>' +

            '</div>' +
            '</div>' +
            '</td>' +

            '<td>' +
            escapeHTML(student.course) +
            '</td>' +

            '<td>' +
            'Semester ' +
            escapeHTML(student.semester) +
            '</td>' +

            '<td>' +
            '<strong style="color:' +
            attendanceColor +
            '">' +
            escapeHTML(student.attendance) +
            '%' +
            '</strong>' +
            '</td>' +

            '<td>' +
            '<span class="status ' +
            feeClass +
            '">' +
            escapeHTML(student.fees) +
            '</span>' +
            '</td>' +

            '<td>' +
            '<span class="status ' +
            statusClass +
            '">' +
            escapeHTML(student.status) +
            '</span>' +
            '</td>' +

            '<td>' +
            '<button ' +
            'class="icon-btn view-student-btn" ' +
            'type="button" ' +
            'title="View student">' +
            '<i class="fa-solid fa-eye"></i>' +
            '</button>' +
            '</td>';


        const viewButton =
            row.querySelector(
                ".view-student-btn"
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function () {
                    viewStudent(student.id);
                }
            );

        }


        tableBody.appendChild(row);

    });

}


/* =========================================================
   STUDENT MODAL
   ========================================================= */

function initializeModal() {

    const closeButton =
        $("#modalClose");

    const cancelButton =
        $("#modalCancel");

    const overlay =
        $("#modalOverlay");

    const form =
        $("#studentForm");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {
                    closeModal();
                }

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            handleStudentSubmit
        );

    }

}


function openStudentModal() {

    const modal =
        $("#modalOverlay");


    if (!modal) {
        return;
    }


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";


    const firstName =
        $("#firstName");


    if (firstName) {

        window.setTimeout(
            function () {
                firstName.focus();
            },
            100
        );

    }

}


function closeModal() {

    const modal =
        $("#modalOverlay");


    if (modal) {
        modal.classList.remove("show");
    }


    document.body.style.overflow = "";

}


/* =========================================================
   ADD STUDENT
   ========================================================= */

function handleStudentSubmit(event) {

    event.preventDefault();


    const firstNameElement =
        $("#firstName");

    const lastNameElement =
        $("#lastName");

    const courseElement =
        $("#studentCourse");

    const semesterElement =
        $("#studentSemester");


    if (
        !firstNameElement ||
        !lastNameElement ||
        !courseElement ||
        !semesterElement
    ) {

        showToast(
            "Form Error",
            "Required fields are missing.",
            "error"
        );

        return;
    }


    const firstName =
        firstNameElement.value.trim();

    const lastName =
        lastNameElement.value.trim();

    const course =
        courseElement.value;

    const semester =
        semesterElement.value;


    if (
        !firstName ||
        !lastName ||
        !course ||
        !semester
    ) {

        showToast(
            "Validation Error",
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    const fullName =
        firstName + " " + lastName;


    const initials =
        firstName.charAt(0) +
        lastName.charAt(0);


    const student = {

        id: generateStudentId(),

        name: fullName,

        initials: initials.toUpperCase(),

        course: course,

        semester: Number(semester),

        attendance: 100,

        fees: "Pending",

        status: "Active",

        color: "blue"

    };


    ERP.students.unshift(student);


    saveStudents();


    renderStudents();


    event.target.reset();


    closeModal();


    navigateTo("students");


    showToast(
        "Student Added",
        fullName +
        " was successfully registered."
    );

}


/* =========================================================
   STUDENT ID
   ========================================================= */

function generateStudentId() {

    let highestNumber = 0;


    ERP.students.forEach(function (student) {

        const parts =
            student.id.split("-");


        const number =
            parseInt(parts[2], 10);


        if (!isNaN(number) && number > highestNumber) {
            highestNumber = number;
        }

    });


    return (
        "STU-2026-" +
        String(highestNumber + 1).padStart(3, "0")
    );

}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveStudents() {

    try {

        localStorage.setItem(
            "eduCoreStudents",
            JSON.stringify(ERP.students)
        );

    } catch (error) {

        console.error(
            "Unable to save students:",
            error
        );

    }

}


function loadStudents() {

    try {

        const saved =
            localStorage.getItem(
                "eduCoreStudents"
            );


        if (!saved) {
            return;
        }


        const students =
            JSON.parse(saved);


        if (Array.isArray(students)) {

            ERP.students =
                students;

        }

    } catch (error) {

        console.error(
            "Unable to load students:",
            error
        );

    }

}


/* =========================================================
   VIEW STUDENT
   ========================================================= */

function viewStudent(id) {

    const student =
        ERP.students.find(function (item) {

            return item.id === id;

        });


    if (!student) {

        showToast(
            "Student Error",
            "Student record not found.",
            "error"
        );

        return;
    }


    showToast(
        student.name,
        student.course +
        " - Attendance " +
        student.attendance +
        "%"
    );

}


/* =========================================================
   FACULTY
   ========================================================= */

function initializeFaculty() {

    renderFaculty();

}


function renderFaculty() {

    const grid =
        $("#facultyGrid");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    ERP.faculty.forEach(function (faculty, index) {

        const card =
            document.createElement("article");


        card.className =
            "faculty-card";


        const avatarColor =
            index % 2 === 0
                ? "blue"
                : "purple";


        card.innerHTML =
            '<div class="faculty-top">' +

            '<div class="avatar avatar-' +
            avatarColor +
            '">' +
            escapeHTML(faculty.initials) +
            '</div>' +

            '<button class="more-btn" type="button">' +
            '<i class="fa-solid fa-ellipsis"></i>' +
            '</button>' +

            '</div>' +

            '<div class="faculty-info">' +

            '<h3>' +
            escapeHTML(faculty.name) +
            '</h3>' +

            '<p>' +
            escapeHTML(faculty.role) +
            '</p>' +

            '</div>' +

            '<div class="faculty-meta">' +

            '<span>' +
            '<i class="fa-solid fa-building"></i>' +
            escapeHTML(faculty.department) +
            '</span>' +

            '</div>' +

            '<p class="faculty-subjects">' +
            escapeHTML(faculty.subjects) +
            '</p>';


        grid.appendChild(card);

    });

}


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

function initializeQuickActions() {

    const buttons =
        $$(".quick-action");


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.getAttribute(
                        "data-action"
                    );


                switch (action) {

                    case "student":

                        openStudentModal();

                        break;


                    case "attendance":

                        navigateTo(
                            "attendance"
                        );

                        showToast(
                            "Attendance",
                            "Attendance management opened."
                        );

                        break;


                    case "fee":

                        navigateTo(
                            "fees"
                        );

                        showToast(
                            "Payments",
                            "Fee management opened."
                        );

                        break;


                    case "notice":

                        navigateTo(
                            "notifications"
                        );

                        showToast(
                            "Announcements",
                            "Notification center opened."
                        );

                        break;


                    default:

                        console.warn(
                            "Unknown action:",
                            action
                        );

                }

            }
        );

    });

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function initializeNotifications() {

    const notificationButton =
        $("#notificationBtn");


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                navigateTo(
                    "notifications"
                );

            }
        );

    }


    const markReadButton =
        $("#markReadBtn");


    if (markReadButton) {

        markReadButton.addEventListener(
            "click",
            function () {

                const notifications =
                    $$(".notification-item");


                notifications.forEach(
                    function (item) {

                        item.classList.remove(
                            "unread"
                        );

                    }
                );


                const count =
                    $(".notification-count");


                if (count) {
                    count.textContent = "0";
                }


                showToast(
                    "Notifications",
                    "All notifications marked as read."
                );

            }
        );

    }

}


/* =========================================================
   TIMETABLE
   ========================================================= */

function initializeTimetable() {

    const dayButtons =
        $$(".day-btn");


    dayButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                dayButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                showToast(
                    "Timetable Updated",
                    button.textContent.trim() +
                    " schedule selected."
                );

            }
        );

    });

}


/* =========================================================
   CHART.JS
   ========================================================= */

function initializeChart() {

    const canvas =
        $("#enrollmentChart");


    if (!canvas) {
        return;
    }


    if (typeof Chart === "undefined") {

        console.warn(
            "Chart.js is not loaded."
        );

        return;
    }


    const context =
        canvas.getContext("2d");


    if (!context) {
        return;
    }


    const gradient =
        context.createLinearGradient(
            0,
            0,
            0,
            280
        );


    gradient.addColorStop(
        0,
        "rgba(91,92,240,0.25)"
    );


    gradient.addColorStop(
        1,
        "rgba(91,92,240,0)"
    );


    new Chart(context, {

        type: "line",


        data: {

            labels: [
                "Oct",
                "Nov",
                "Dec",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep"
            ],


            datasets: [

                {

                    label: "Students",

                    data: [
                        9400,
                        9720,
                        10020,
                        10450,
                        10890,
                        11120,
                        11480,
                        11790,
                        12010,
                        12320,
                        12610,
                        12845
                    ],

                    borderColor: "#5b5cf0",

                    backgroundColor: gradient,

                    fill: true,

                    tension: 0.4,

                    borderWidth: 2,

                    pointRadius: 3,

                    pointHoverRadius: 6

                }

            ]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,


            plugins: {

                legend: {
                    display: false
                },

                tooltip: {
                    padding: 10
                }

            },


            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#98a2b3",
                        font: {
                            size: 9
                        }
                    }

                },


                y: {

                    border: {
                        display: false
                    },

                    grid: {
                        color:
                            "rgba(152,162,179,0.12)"
                    },

                    ticks: {
                        color: "#98a2b3",
                        font: {
                            size: 9
                        }
                    }

                }

            }

        }

    });

}


/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

function initializeCounters() {

    const counters =
        $$("[data-counter]");


    counters.forEach(function (element) {

        const target =
            Number(
                element.getAttribute(
                    "data-counter"
                )
            );


        if (!isNaN(target)) {

            animateCounter(
                element,
                target
            );

        }

    });

}


function animateCounter(
    element,
    target
) {

    const duration = 1000;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * eased
            );


        element.textContent =
            value.toLocaleString();


        if (progress < 1) {

            window.requestAnimationFrame(
                update
            );

        }

    }


    window.requestAnimationFrame(
        update
    );

}


/* =========================================================
   LOGOUT
   ========================================================= */

function initializeLogout() {

    const logoutButton =
        $("#logoutBtn");


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        function () {

            showToast(
                "Logout",
                "You have been logged out successfully."
            );

        }
    );

}


/* =========================================================
   TOAST SYSTEM
   ========================================================= */

function showToast(
    title,
    message,
    type
) {

    const container =
        $("#toastContainer");


    if (!container) {
        return;
    }


    const toast =
        document.createElement("div");


    toast.className =
        "toast";


    const isError =
        type === "error";


    const icon =
        isError
            ? "fa-circle-exclamation"
            : "fa-circle-check";


    const iconColor =
        isError
            ? "var(--danger)"
            : "var(--success)";


    const background =
        isError
            ? "var(--danger-light)"
            : "var(--success-light)";


    const iconWrapper =
        document.createElement("div");


    iconWrapper.className =
        "toast-icon";


    iconWrapper.style.color =
        iconColor;


    iconWrapper.style.background =
        background;


    const iconElement =
        document.createElement("i");


    iconElement.className =
        "fa-solid " + icon;


    iconWrapper.appendChild(
        iconElement
    );


    const content =
        document.createElement("div");


    content.className =
        "toast-content";


    const titleElement =
        document.createElement("strong");


    titleElement.textContent =
        title;


    const messageElement =
        document.createElement("span");


    messageElement.textContent =
        message;


    content.appendChild(
        titleElement
    );


    content.appendChild(
        messageElement
    );


    toast.appendChild(
        iconWrapper
    );


    toast.appendChild(
        content
    );


    container.appendChild(
        toast
    );


    window.setTimeout(
        function () {

            toast.classList.add(
                "hide"
            );


            window.setTimeout(
                function () {

                    if (toast.parentNode) {
                        toast.remove();
                    }

                },
                300
            );

        },
        3500
    );

}


/* =========================================================
   HTML SECURITY
   ========================================================= */

function escapeHTML(value) {

    const element =
        document.createElement("div");


    element.textContent =
        String(value);


    return element.innerHTML;

}


/* =========================================================
   GLOBAL API
   ========================================================= */

window.viewStudent =
    viewStudent;


/* =========================================================
   END
   ========================================================= */