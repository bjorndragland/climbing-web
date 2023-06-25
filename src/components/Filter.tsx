import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Leaflet from "./common/leaflet/leaflet";
import { Loading } from "./common/widgets/widgets";
import {
  Header,
  Segment,
  Form,
  Dropdown,
  Button,
  Checkbox,
  Icon,
  List,
  Image,
} from "semantic-ui-react";
import { getMeta, getImageUrl, postFilter, getLocales } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import { Stars, LockSymbol } from "./common/widgets/widgets";
import { useLocalStorage } from "../utils/use-local-storage";

enum OrderBy {
  alphabetical,
  crag,
  rating,
}

const Filter = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [meta, setMeta] = useState<any>(null);
  const [grades, setGrades] = useLocalStorage<number[]>("filter_grades", []);
  const [disciplines, setDisciplines] = useLocalStorage<number[]>(
    "filter_disciplines",
    []
  );
  const [routeTypes, setRouteTypes] = useLocalStorage<number[]>(
    "filter_route_types",
    []
  );
  const [result, setResult] = useLocalStorage<any[]>("filter_result", []);
  const [refreshing, setRefreshing] = useState(false);
  const [hideTicked, setHideTicked] = useLocalStorage("filter_ticked", false);
  const [onlyWithMedia, setOnlyWithMedia] = useLocalStorage(
    "filter_only_with_media",
    false
  );
  const [onlyAdmin, setOnlyAdmin] = useLocalStorage("filter_only_admin", false);
  const [onlySuperAdmin, setOnlySuperAdmin] = useLocalStorage(
    "filter_only_sa",
    false
  );
  const [orderBy, setOrderBy] = useLocalStorage<OrderBy>(
    "filter_order_by",
    OrderBy.alphabetical
  );

  const orderByOptions = [
    {
      key: OrderBy.alphabetical,
      text: OrderBy[OrderBy.alphabetical],
      value: OrderBy[OrderBy.alphabetical],
    },
    {
      key: OrderBy.crag,
      text: OrderBy[OrderBy.crag],
      value: OrderBy[OrderBy.crag],
    },
    {
      key: OrderBy.rating,
      text: OrderBy[OrderBy.rating],
      value: OrderBy[OrderBy.rating],
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      const update = async () => {
        const accessToken = isAuthenticated
          ? await getAccessTokenSilently()
          : null;
        getMeta(accessToken).then((meta) => setMeta({ ...meta, accessToken }));
      };
      update();
    }
  }, [isLoading, isAuthenticated]);

  function setData(data, newOrderBy: OrderBy) {
    setOrderBy(newOrderBy);
    const result = data.sort((a, b) => {
      if (newOrderBy === OrderBy.alphabetical) {
        return a.problemName.localeCompare(b.problemName, getLocales());
      } else if (newOrderBy === OrderBy.crag) {
        if (a.areaName != b.areaName)
          return a.areaName.localeCompare(b.areaName, getLocales());
        else if (a.sectorName != b.sectorName)
          return a.sectorName.localeCompare(b.sectorName, getLocales());
        return a.problemName.localeCompare(b.problemName, getLocales());
      } else if (newOrderBy === OrderBy.rating) {
        if (a.stars != b.stars) return b.stars - a.stars;
        return a.problemName.localeCompare(b.problemName, getLocales());
      }
    });
    setResult(result);
  }

  if (!meta) {
    return <Loading />;
  }
  const isBouldering = meta.metadata.gradeSystem === "BOULDER";
  const gradeOptions = meta.metadata.grades.map((g) => ({
    key: g.id,
    value: g.id,
    text: g.grade,
  }));
  const disciplineOptions = meta.metadata.types
    .sort((a, b) => a.subType.localeCompare(b.subType, getLocales()))
    .map((t) => ({ key: t.id, value: t.id, text: t.subType }));
  const res =
    result?.filter(
      (p) =>
        (!hideTicked || !p.ticked) &&
        (!onlyWithMedia || p.randomMediaId > 0) &&
        (!onlyAdmin || p.lockedAdmin) &&
        (!onlySuperAdmin || p.lockedSuperadmin)
    ) ?? [];
  return (
    <>
      <Helmet>
        <title>{meta.metadata.title} | Filter</title>
      </Helmet>
      <Segment>
        <Header>Filter</Header>
        <Form>
          <Form.Field>
            <Dropdown
              placeholder="Select grade(s)"
              fluid
              multiple
              selection
              options={gradeOptions}
              value={grades ? grades : []}
              onChange={(e, { value }) => {
                setGrades(value as number[]);
                setResult([]);
              }}
            />
          </Form.Field>
          {disciplineOptions.length > 1 && (
            <Form.Field>
              <Dropdown
                placeholder="Select discipline(s)"
                fluid
                multiple
                selection
                options={disciplineOptions}
                value={disciplines || []}
                onChange={(e, { value }) => {
                  setDisciplines(value as number[]);
                  setResult([]);
                }}
              />
            </Form.Field>
          )}
          {!isBouldering && (
            <Form.Field>
              <Dropdown
                placeholder="Select type(s)"
                fluid
                multiple
                selection
                options={[
                  {
                    key: "Single-pitch",
                    value: "Single-pitch",
                    text: "Single-pitch",
                  },
                  {
                    key: "Multi-pitch",
                    value: "Multi-pitch",
                    text: "Multi-pitch",
                  },
                ]}
                value={routeTypes || []}
                onChange={(e, { value }) => {
                  setRouteTypes(value as number[]);
                  setResult([]);
                }}
              />
            </Form.Field>
          )}
          <Form.Field>
            <Checkbox
              label="Hide ticked"
              checked={hideTicked}
              disabled={!meta.metadata.isAuthenticated}
              onChange={() => setHideTicked(!hideTicked)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Only with images/videos"
              checked={onlyWithMedia}
              onChange={() => setOnlyWithMedia(!onlyWithMedia)}
            />
          </Form.Field>
          {meta.metadata.isAdmin && (
            <Form.Field>
              <Checkbox
                label="Only admin"
                checked={onlyAdmin}
                onChange={() => {
                  setOnlyAdmin(!onlyAdmin);
                  setOnlySuperAdmin(false);
                }}
              />
            </Form.Field>
          )}
          {meta.metadata.isSuperAdmin && (
            <Form.Field>
              <Checkbox
                label="Only superadmin"
                checked={onlySuperAdmin}
                onChange={() => {
                  setOnlyAdmin(false);
                  setOnlySuperAdmin(!onlySuperAdmin);
                }}
              />
            </Form.Field>
          )}
          <Button
            icon
            labelPosition="left"
            disabled={
              !grades ||
              grades.length == 0 ||
              (disciplineOptions.length > 1 &&
                (!disciplines || disciplines.length == 0)) ||
              (!isBouldering && routeTypes?.length === 0)
            }
            loading={refreshing}
            onClick={() => {
              setRefreshing(true);
              const myDisciplines =
                disciplineOptions.length === 1
                  ? [disciplineOptions[0].value]
                  : disciplines;
              postFilter(
                meta.accessToken,
                grades,
                myDisciplines,
                routeTypes.map((v) => String(v))
              ).then((res) => {
                setData(res, orderBy);
                setRefreshing(false);
              });
            }}
          >
            <Icon name="filter" />
            Filter
          </Button>
        </Form>
      </Segment>
      {res.length > 0 && (
        <Segment>
          <div style={{ paddingBottom: "10px" }}>
            <Dropdown
              icon="sort"
              size="mini"
              id="dropdownOrderBy"
              style={{ float: "right" }}
              options={orderByOptions}
              value={OrderBy[orderBy]}
              onChange={(e, { value }) =>
                setData(result, OrderBy[value as keyof typeof OrderBy])
              }
            />
            <Header as="h3">
              {res.length} {isBouldering ? "Problems" : "Routes"}
            </Header>
          </div>
          <Leaflet
            autoZoom={true}
            height="40vh"
            markers={res
              .filter((p) => p.latitude != 0 && p.longitude != 0)
              .map((p) => ({
                lat: p.latitude,
                lng: p.longitude,
                label: p.problemName,
                url: "/problem/" + p.problemId,
              }))}
            defaultCenter={meta.metadata.defaultCenter}
            defaultZoom={meta.metadata.defaultZoom}
            polylines={null}
            outlines={null}
            onMouseClick={null}
            onMouseMove={null}
            showSateliteImage={false}
            clusterMarkers={true}
            rocks={null}
            flyToId={null}
          />
          <List selection verticalAlign="middle">
            {res.map((p, i) => (
              <List.Item key={i} as={Link} to={`/problem/${p.problemId}`}>
                <Image
                  avatar
                  src={
                    p.randomMediaId > 0
                      ? getImageUrl(p.randomMediaId, p.randomMediaCrc32, 28)
                      : "/png/image.png"
                  }
                />
                <List.Content>
                  <List.Header>
                    <Link to={`/problem/${p.problemId}`}>{p.problemName}</Link>{" "}
                    {p.grade}{" "}
                    <LockSymbol
                      lockedAdmin={p.problemLockedAdmin}
                      lockedSuperadmin={p.problemLockedSuperadmin}
                    />{" "}
                    <Stars numStars={p.stars} includeNoRating={false} />
                    {p.ticks > 0 && (
                      <small>
                        ({p.ticks} ascent{p.ticks > 1 && "s"})
                      </small>
                    )}
                  </List.Header>
                  <List.Description>
                    {p.areaName}{" "}
                    <LockSymbol
                      lockedAdmin={p.areaLockedAdmin}
                      lockedSuperadmin={p.areaLockedSuperadmin}
                    />{" "}
                    / {p.sectorName}{" "}
                    <LockSymbol
                      lockedAdmin={p.sectorLockedAdmin}
                      lockedSuperadmin={p.sectorLockedSuperadmin}
                    />
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </>
  );
};

export default Filter;
