import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { getThumbnail } from "../api";
import { FaTrash } from "react-icons/fa";
import { GetWatchLater } from "../api/apiWatchLater";

const FavoritePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [watchLater, setWatchLater] = useState([]);

  const fetchWatchLater = () => {
    setIsLoading(true);
    GetMyWatchLaterById()
      .then((response) => {
        setWatchLater(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchWatchLater();
  }, []);

  return (
    <Container classname="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap">Watch Later Videos</h1>
        <hr className="border-top border-light opacity-50 w-100" />
      </Stack>
      {isLoading ? (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : watchLater?.length > 0 ? (
        <Row>
          {watchLater?.map((watchLater) => (
            <Col className="w-100">
              <Card className="">
                <Row className="">
                  <Col md={3}>
                    <Image
                      src="https://i.ytimg.com/vi/1XW7R3J4CQI/maxresdefault.jpg"
                      alt="Thumbnail"
                      className=""
                      style={{ width: "200px", aspectRatio: "16 / 9" }}
                    ></Image>
                  </Col>
                  <Col md={6}>
                    <Card.Body>
                      <p>tes</p>
                      <p>tes</p>
                    </Card.Body>
                  </Col>
                  <Col
                    md={3}
                    className="d-flex flex-column justify-content-between"
                  >
                    <p>aa</p>
                    <div className="text-end p-3">
                      <Button variant="danger">
                        <FaTrash className="mx-1 mb-1" />
                        Hapus
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="dark" className="text-center">
          Belum ada video di Watch later, yuk tambah Video!
        </Alert>
      )}
    </Container>
  );
};

export default FavoritePage;
