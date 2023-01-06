import React, { useEffect, useState } from 'react';

import { Card, Col, Row } from 'react-bootstrap';

import IconRemove from './assets/img/icon-remove.svg';

import data from './json/data.json';

import './assets/sass/global.scss';

function App() {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [filterSelect, setFilterSelect] = useState<any>([]);
  const [filterCards, setFilterCards] = useState<any>(data);
  const [classMargin, setClassMargin] = useState<any>();


  function FilterSelect(select: any) {
    window.scrollTo(0, 0);

    let exits: any = filterSelect.indexOf(select);

    setFilterActive(true);

    if (exits === -1) {
      setFilterSelect([...filterSelect, select]);
    }
  }

  function FilterRemove(filter: any) {
    let position: any = filterSelect.indexOf(filter);
    filterSelect.splice(position, 1);

    setFilterSelect([...filterSelect]);
  }


  function FilterClear() {
    setFilterActive(false);

    setFilterSelect([]);
  }

  useEffect(() => {
    setFilterCards(
      data.filter((job: any) => {
        return (
          filterSelect.every((filters: any) => {
            return (
              job.languages.includes(filters) ||
              job.tools.includes(filters) ||
              job.role === filters ||
              job.level === filters
            )
          })
        )
      })
    )

    if(filterSelect.length < 3) {
      setClassMargin("m-custom-0")
    } else if (filterSelect.length >= 3 && filterSelect.length < 5) {
      setClassMargin("m-custom-2")
    } else if (filterSelect.length >= 5) {
      setClassMargin("m-custom-4")
    }

  }, [filterSelect])
  

  return (
    <div className="bg-job-listing">
      <div className={`${classMargin} bg-header-job-listing`}>
        {
          filterActive === true
            ?
            filterSelect.length !== 0
              ?
              <div className={'bg-filter container'}>
                <Card>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-wrap gap-4'>
                      {
                        /* filterSelect.length !== 0
                          ? */
                        filterSelect.map((filter: any, index: any) => {
                          return (
                            <div className='d-flex'>
                              <div key={index} className="bagde">
                                <span>{filter}</span>
                              </div>
                              <div className='remove' onClick={() => FilterRemove(filter)}>
                                <img src={IconRemove} alt="icon remove" style={{ width: '80%' }} />
                              </div>
                            </div>
                          )
                        })
                        /* :
                        <></> */
                      }
                    </div>
                    <div className="clear" onClick={() => FilterClear()}>
                      <span>Clear</span>
                    </div>
                  </div>
                </Card>
              </div>
              :
              <></>
            :
            <></>
        }
      </div>
      <div className='bg-content-job-listing container'>
        {
          filterCards.map((item: any, index: any) => {
            return (
              <>
                <Card key={index} className={item.featured === true ? `active-featured` : ``}>
                  <Row>
                    <Col lg={2} className="d-flex justify-content-center">
                      <img src={item.logo} alt="" className='img-logo' />
                    </Col>
                    <Col lg={5} className="d-flex flex-column justify-content-center gap-2 content-job-listing px-0 px-lg-2">
                      <Row>
                        <div className='d-flex gap-4 mb-1'>
                          <h5>{item.company}</h5>

                          <div className='d-flex gap-3'>
                            {
                              item.new === true
                                ?
                                <div className='bagde-new'>
                                  <span>NEW!</span>
                                </div>
                                :
                                <></>
                            }
                            {
                              item.featured === true
                                ?
                                <div className='bagde-featured'>
                                  <span>FEATURED</span>
                                </div>
                                :
                                <></>
                            }
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <h4>{item.position}</h4>
                      </Row>
                      <Row>
                        <div className='d-flex gap-3'>
                          <p>{item.postedAt}</p>
                          <p style={{ lineHeight: "1rem", fontSize: "2rem" }}>.</p>
                          <p>{item.contract}</p>
                          <p style={{ lineHeight: "1rem", fontSize: "2rem" }}>.</p>
                          <p>{item.location}</p>
                        </div>
                      </Row>
                    </Col>
                    <Col lg={5} className="d-flex align-items-center gap-3 flex-wrap align-content-center justify-content-start justify-content-lg-end px-0 px-lg-2">
                      <div className='bagde' onClick={() => FilterSelect(item.role)}>
                        <span>{item.role}</span>
                      </div>
                      <div className='bagde' onClick={() => FilterSelect(item.level)}>
                        <span>{item.level}</span>
                      </div>
                      {
                        item.tools.map((info: any, index: any) => {
                          return (
                            <div key={index} className='bagde' onClick={() => FilterSelect(info)}>
                              <span>{info}</span>
                            </div>
                          )
                        }, [])
                      }
                      {
                        item.languages.map((lang: any, index: any) => {
                          return (
                            <div key={index} className='bagde' onClick={() => FilterSelect(lang)}>
                              <span>{lang}</span>
                            </div>
                          )
                        }, [])
                      }
                    </Col>
                  </Row>
                </Card>
              </>
            )
          })
        }
      </div>


      {/* <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>.
        Coded by <a href="#">Your Name Here</a>.
      </div> */}
    </div>
  );
}

export default App;
