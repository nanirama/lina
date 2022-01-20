/**
 * Shows testimonials on the landing page
 */
import React from "react";
import SharpStars from "./SharpStars";

interface Props { }

const Testimonial: React.FC<{ title: string; style: React.CSSProperties }> = ({
  title,
  children,
  style,
}) => {
  return (
    <div
      className="p-8 max-w-sm mb-4 w-full md:w-96 flex-shrink-0"
      style={style}
    >
      <div className="text-sm font-bold mb-8">{title}</div>
      <div className="leading-relaxed mb-8">{children}</div>
      <SharpStars />
    </div>
  );
};

const testimonials = [
  <Testimonial
    key="testimonial-2"
    title="Patient from Miami"
    style={{
      backgroundColor: "rgba(77, 188, 195, 0.1)",
    }}
  >
    My provider was kind and considerate. He asked me a lot of questions to get
    to the root of my feelings. The medication shipment was also super
    convenient for me. I&apos;m so glad I was able to quickly book an
    appointment with Lina.
  </Testimonial>,
  <Testimonial
    key="testimonial-3"
    title="Patient from Pensacola"
    style={{ backgroundColor: "rgba(255, 217, 208, 0.7)" }}
  >
    I was able to book an appointment with Dr. P within a day. He was
    understanding, straightforward, and caring. He answered all my questions and
    made me feel confident about my treatment. It&apos;s been a great experience
    so far.
  </Testimonial>,
  <Testimonial
    key="testimonial-1"
    title="Patient from Tampa Bay"
    style={{ backgroundColor: "rgba(77, 188, 195, 0.1)" }}
  >
    Telehealth is so important, it enables people to get care with an actual
    person over video. Sometimes we can&apos;t physically get to a doctor&apos;s
    office, but now Lina offers something for everyone who can&apos;t do
    in-person. Thanks for creating this platform!
  </Testimonial>,
];

const Testimonials: React.FC<Props> = ({ heading, data }) => {
  console.log('Heading inside', data)
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <h2 className="text-3xl md:text-4xl text-center md:text-left mb-8">
            {heading ? heading : 'Life changing results from real members'}          
        </h2>
      </div>
      <div className="w-full flex flex-col justify-center md:justify-start md:flex-row overflow-auto md:space-x-4">
        {/* {testimonials} */}
        { data && data.map(({fields}, index)=>{           
              if(index % 2 == 0){
                return(
                  <Testimonial
                    key={`testimonial-${index+1}`}
                    title={fields.clientName}
                    style={{ backgroundColor: "rgba(77, 188, 195, 0.1)" }}
                  >
                    {fields.testimonial}
                  </Testimonial>
                )
              } else {
                return(
                  <Testimonial
                    key={`testimonial-${index+1}`}
                    title={fields.clientName}
                    style={{backgroundColor: "rgba(255, 217, 208, 0.7)" }}
                  >
                    {fields.testimonial}
                  </Testimonial>
                )
              }
          })}
      </div>
    </div>
  );
};

export default Testimonials;
