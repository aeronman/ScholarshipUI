import React from "react";
import Slider from "react-slick";
import './RegApplication1.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RegApplication1({ moveToForm, formData, setFormData }) {
    const scholarshipData = [
        { 
            title: "AVSP at ABOSP", 
            subtitle: "(Anak ng Volunteer Scholarship Program at Anak ng Barangay Official Scholarship Program)", 
            description: 
                "Ang Financial Assistance for Senior High Scholarship Program. Sa pagbubukas ng K12 Program ng Kagawaran ng Edukasyon, " +
                "sa pamamagitan ng pinagtibay na Kapasiyahang Panlungsod Blg. 125-2017 ni iniakda ay pinagtibay ng Punong Lungsod " +
                "ang pagkaloob ng ayudang pinansyal sa mga kabataan na mag-aaral sa Grade 11 at 12. Ang mga mag-aaral na benepisyaryo " +
                "ng programang ito at tatanggap ng halagang P2,000.00 bawat semestre ay kailangang tumugon sa hinihinging kwalipikasyon, " +
                "may gradong hindi bababa sa katumbas na 83% sa pagtatapos ng Grade 10 at nakapagsumite hanggang sa itinakdang palugit na " +
                "panahon ng namamahala sa programa. First Come, First Serve para sa itinakdang bilang ng benepisyaryo ng programa.",
            buttonText: "Apply Now >>"
        },
        { 
            title: "FASHS", 
            subtitle: "(Financial Assistance for Senior High Scholarship Program)", 
            description: 
                "Ang Financial Assistance for Senior High Scholarship Program. Sa pagbubukas ng K12 Program ng Kagawaran ng Edukasyon, " +
                "sa pamamagitan ng pinagtibay na Kapasiyahang Panlungsod Blg. 125-2017 ni iniakda ay pinagtibay ng Punong Lungsod " +
                "ang pagkaloob ng ayudang pinansyal sa mga kabataan na mag-aaral sa Grade 11 at 12. Ang mga mag-aaral na benepisyaryo " +
                "ng programang ito at tatanggap ng halagang P2,000.00 bawat semestre ay kailangang tumugon sa hinihinging kwalipikasyon, " +
                "may gradong hindi bababa sa katumbas na 83% sa pagtatapos ng Grade 10 at nakapagsumite hanggang sa itinakdang palugit na " +
                "panahon ng namamahala sa programa. First Come, First Serve para sa itinakdang bilang ng benepisyaryo ng programa.",
            buttonText: "Apply Now >>"
        },
        { 
            title: "TPKM", 
            subtitle: "(Tulong Pang-edukasyon sa Kabataang Malolenyo)", 
            description: 
                "Ang Tulong Pang-edukasyon sa Kabataang Malolenyo ay bahagi ng programang pagpapaaral o scholarship program na ang mga magulang " +
                "sa panahon ng 'enrolment' o pagpapatala sa paaralan ng magiging benepisyaryo ay biglaang nawalan ng hanapbuhay o hindi-sapat " +
                "ang pinagkakakitaan at hindi nakaabot sa pamantayang ₱180,000 pinagsamang kita sa bawat taon. Ang benepisyaryo ng programang " +
                "ito ay kailangang may gradong hindi bababa sa katumbas na 83% (general average). Hindi dadaan sa pagsusulit subalit may panayam, " +
                "ebalaswasyon at balidasyon ang mga aplikante at ang makapapasa ay tatanggap ng sa bawat semestre hanggang sa makapagtapos ng pag-aaral. " +
                "First Come First Serve para sa takdang bilang ng benepisyaryo ng programa bawat taon.",
            buttonText: "Apply Now >>"
        },
        { 
            title: "NMMSP", 
            subtitle: "(Natatanging Mag-aaral na Malolenyo Scholarship Program)", 
            description: 
                "Ang Natatanging Mag-aaral na Malolenyo Scholarship Program ay bukas sa lahat ng kabataang Malolenyo na nakapagtapos sa HS/Grade 12 " +
                "na may gradong hindi bababa sa katumbas na 88% at ang mga magiging benepisyaryo ng programang ito na tatanggap ng halagang ₱5,000 bawat semestre " +
                "ay dadaan sa pagsusulit.",
            buttonText: "Apply Now >>"
        },
        { 
            title: "VCSP", 
            subtitle: "(Vocational Course Scholarship Program)", 
            description: 
                "Ang Vocational Course Scholarship Program ay programa sa mga Malolenyo na ang piniling kurso ay 'vocational' lamang o tatagal lamang " +
                "ng hindi bababa sa hanggang dalawang(2) taong pag-aaral sa alinmang vocational school. Tatanggap ng halagang P2,500.00 bawat semestre " +
                "ang mga Malolenyo na makapapasa sa lahat ng kwalipikasyong itinakda ng programa hanggang sa makapagtapos ng pag-aaral. First Come, First Serve " +
                "para sa takdang bilang ng benepisyaryo ng programa.",
            buttonText: "Apply Now >>"
        },
        { 
            title: "APKA", 
            subtitle: "(Alalay Paaral sa Kawani at Anak)", 
            description: 
                "Alalay Paaral sa Kawani at Anak (APKA). Ito ay bukas para sa mga kawani ng Pamahalaang Panlungsod ng Malolos at kanilang mga anak na nag-aaral " +
                "sa kolehiyo maging ito ay vocational course o apat(4) o linang(5) taong kurso. Ang benepisyo ay ipinagkakaloob sa mga kawani habang sila ay " +
                "nananatili sa paglilingkuran bilang kawani. Hindi bababa sa 81% ang grado sa high school o katumbas na 2.5 kung nag-aaral na sa kolehiyo " +
                "at namimintine ito hanggang makatapos ng pag-aaral. Tatanggap ng P3,000.00 bawat semestre ang benepisyaro rito.",
            buttonText: "Apply Now >>"
        },
        { 
            title: "LMSK", 
            subtitle: "(Natatanging Mag-aaral na Malolenyo Scholarship Program)", 
            description: 
                "Ang Libro Mo Sagot Ko Program ay programang naglalayong tumugon sa pangangailangan ng isang mag-aaral sa kolehiyo na hindi nakapasok o nakaabot " +
                "sa kwalipikasyon at pamantayang itinakda ng alinmang programang pagpapaaral (scholarship program) gaya ng kakayanan ng magulang na matustusan " +
                "ang pag-aaral; mababa ang marka at hindi nakaabot sa hinihinging grado ng programa at hindi. Ang mga benepisyaryo ng programang ito ay maaaring " +
                "mailipat sa mas mataas na kategorya ng programa kung sila ay makaaabot at makatutugon sa hinihinging mga kwalipikasyon at programa.",
            buttonText: "Apply Now >>"
        }
    ];

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev" onClick={onClick}>
                <span>&lt;</span>
            </div>
        );
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,  // This makes the center card effect work
        centerPadding: "0px",  // Removes padding around the center card
        autoplay: false,
        prevArrow: <button className="slick-prev">←</button>,
        nextArrow: <button className="slick-next">→</button>,
        focusOnSelect: false, // Disable selecting slides when clicking
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const applyForScholarship = (scholarshipTitle) => {

        setFormData((prevFormData) => ({
            ...prevFormData,
            scholarshipProgram: scholarshipTitle,
        }));
        localStorage.setItem("program_applied",scholarshipTitle);
        moveToForm();
    };

    const isButtonDisabled = localStorage.getItem('status') !== null && localStorage.getItem('status') !== '';

    return (
        <div className="scholarship-programs-container">
            <Slider {...settings} className="scholarship-slider">
                {scholarshipData.map((scholarship, index) => (
                    <div key={index} className="scholarship-card">
                        <div className="scholarship-title">
                            <h3>{scholarship.title}</h3>
                            <a>{scholarship.subtitle}</a>
                        </div>
                        <p>{scholarship.description}</p>
                        <button
                            className="apply-button"
                            onClick={() => applyForScholarship(scholarship.title)}
                            disabled={isButtonDisabled}
                        >
                            {scholarship.buttonText}
                        </button>
                  

                    </div>
                ))}
            </Slider>
        </div>
    );
}