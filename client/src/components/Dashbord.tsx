import { FC, FormEvent, useRef } from "react";
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { FaLocationArrow, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const DummyData = [
  { id: 1, username: "User1", title: "Title1" },
  { id: 2, username: "User2", title: "Title2" },
  { id: 3, username: "User3", title: "Title3" },
  { id: 4, username: "User1", title: "Title1" },
  { id: 5, username: "User2", title: "Title2" },
  { id: 6, username: "User3", title: "Title3" },
];

const Dashbord: FC = () => {
  const chatMessageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatMessageRef.current) {
      const chatMessageValue = chatMessageRef.current.value;
      console.log(chatMessageValue); // Log the form data
      // Additional logic for form submission can be added here

      chatMessageRef.current.value = "";
    }
  };
  return (
    <section className="userListing_section">
      <section className="userListings">
        {DummyData.map((item) => (
          <Card key={item.id} className="card-item">
            <Card.Body>
              <Card.Title>{item.username}</Card.Title>

              <p className="item-text">{item.title}</p>
              <div className="card-call-to-action">
                <FaRegEdit size={18} color="#006400" />
                <RiDeleteBin6Line size={18} color="#FF0000" />
              </div>
            </Card.Body>
          </Card>
        ))}
      </section>

      <section>
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-center">
            <Col>
              <FormControl
                ref={chatMessageRef}
                required
                type="text"
                name="chatMessage"
                placeholder="Chat Message"
              />
            </Col>
            <Col xs="auto">
              <Button className="buttonChat" type="submit">
                <FaLocationArrow size={22} />
              </Button>
            </Col>
          </Row>
        </Form>
      </section>
    </section>
  );
};

export default Dashbord;
