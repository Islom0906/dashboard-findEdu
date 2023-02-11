import {useEffect, useState} from 'react';
import {isEmpty} from './GlobalHelper';
import jwtAxios from './../services/auth/jwt-auth/jwt-api';
import {API_FAILED} from '../../shared/constants/SystemMessages';
import {isRequestSuccessful} from './Utils';
import {fetchError} from '../../redux/actions';

export const useGetDataApi = (
  url,
  initialData = [],
  params = {},
  noPagination = false,
  reverse = false,
) => {
  const [page, setPage] = useState(1);

  const [initialUrl, updateInitialUrl] = useState(url);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [apiData, setData] = useState(initialData);
  const [queryParams, updateQueryParams] = useState(params);
  const [keywords, updateKeywords] = useState('');
  const [isResetRequired, setResetRequired] = useState(false);
  const [hasMoreRecord, setMoreRecordStatus] = useState(true);

  const setKeywords = (keywords) => {
    if (Array.isArray(initialData)) {
      if (!queryParams.skipReset) {
        setPage(1);
        setResetRequired(true);
      }
    }
    updateKeywords(keywords);
  };

  const checkHasMoreRecord = (data) => {
    let perPageItems = 10;
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty('limit')) {
      perPageItems = params.limit;
    }

    setMoreRecordStatus(data.length === perPageItems);
  };

  const setQueryParams = (queryParams) => {
    if (Array.isArray(initialData)) {
      if (!queryParams.skipReset) {
        setPage(1);
        setResetRequired(true);
      }
    }
    updateQueryParams(queryParams);
  };

  useEffect(() => {
    let didCancel = false;

    const fetchData = () => {
      if (
        page === 1 &&
        ((Array.isArray(apiData) && apiData.length === 0) ||
          !Array.isArray(apiData)) &&
        !isResetRequired
      ) {
        setLoading(true);
      }
      if (queryParams.skipReset) {
        setLoading(true);
      }
      let params = {};
      if (keywords || !isEmpty(queryParams)) {
        params = {search: keywords, ...queryParams};
      }
      if (Array.isArray(apiData) && !noPagination) {
        params = {...queryParams, page, search: keywords};
      }
      console.log('Called: ', initialUrl, params);
      jwtAxios
        .get(initialUrl, {params})
        .then(({data}) => {
          if (!didCancel) {
            if (isRequestSuccessful(data.status)) {
              console.log(
                'Success: ',
                initialUrl,
                keywords,
                queryParams,
                data.result,
              );
              if (Array.isArray(initialData)) {
                checkHasMoreRecord(data.result);
                setLoadingMore(false);
                setRefreshing(false);
                setResetRequired(false);
                let resData = isResetRequired ? initialData : apiData;
                console.log(
                  'isResetRequired, apiData:  ',
                  isResetRequired,
                  apiData,
                );
                if (reverse) {
                  resData = [...data.result].concat([...resData]);
                  console.log('reverse: ', resData);
                } else if (page === 1) {
                  resData = data.result;
                } else if (page > 1) {
                  resData = resData.concat(data.result);
                }
                setData(resData);
              } else {
                setData(data.result);
              }
              setLoading(false);
            } else {
              console.log(
                'Failed : ',
                initialUrl,
                queryParams,
                data.result.error,
              );
              setLoading(false);
              fetchError(data.error);
            }
          }
        })
        .catch(function (error) {
          if (!didCancel) {
            console.log('Error : ', initialUrl, queryParams, error.message);
            setLoading(false);
            fetchError(API_FAILED);
          }
        });
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [initialUrl, page, keywords, queryParams, refreshing]);
  return [
    {
      loading,
      apiData,
      page,
      isLoadingMore,
      refreshing,
      initialUrl,
      hasMoreRecord,
    },
    {
      setPage,
      setData,
      setLoading,
      updateInitialUrl,
      setKeywords,
      setQueryParams,
      setLoadingMore,
      setRefreshing,
    },
  ];
};

export const useOptionDataApi = (
  initialUrl,
  initialData = [],
  params = {},
  noPagination,
) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [apiData, setData] = useState(initialData);
  const [queryParams, updateQueryParams] = useState(params);
  const [keywords, updateKeywords] = useState('');
  const [isResetRequired, setResetRequired] = useState(false);

  const setKeywords = (keywords) => {
    if (Array.isArray(initialData)) {
      setPage(1);
      setResetRequired(true);
    }
    updateKeywords(keywords);
  };

  const setQueryParams = (queryParams) => {
    if (Array.isArray(initialData)) {
      setPage(1);
      setResetRequired(true);
    }
    updateQueryParams(queryParams);
  };

  useEffect(() => {
    let didCancel = false;
    const updatedUrl = () => {
      if (noPagination) {
        return initialUrl;
      }
      if (initialUrl.includes('page')) {
        return initialUrl.replace('page', page);
      }
      if (Array.isArray(initialData)) {
        return initialUrl + page;
      }
      return initialUrl;
    };

    const fetchData = () => {
      if (
        page === 1 &&
        ((Array.isArray(apiData) && apiData.length === 0) ||
          !Array.isArray(apiData)) &&
        !isResetRequired
      ) {
        setLoading(true);
      }
      let params = {};
      if (keywords || !isEmpty(queryParams)) {
        params = {keywords: keywords, ...queryParams};
      }
      jwtAxios
        .options(updatedUrl(), {params})
        .then(({data}) => {
          console.log('data: ', data);
          if (!didCancel) {
            if (isRequestSuccessful(data.status)) {
              console.log(
                'Success: ',
                updatedUrl(),
                keywords,
                queryParams,
                data.result,
              );
              if (Array.isArray(initialData)) {
                setLoadingMore(false);
                setRefreshing(false);
                setResetRequired(false);
                let resData = isResetRequired ? initialData : apiData;
                if (page === 1) {
                  resData = data.result;
                } else if (page > 1) {
                  resData = resData.concat(data.result);
                }
                setData(resData);
              } else {
                setData(data.result);
              }
              setLoading(false);
            } else {
              console.log('Failed : ', updatedUrl(), queryParams, data.error);
              setLoading(false);
              fetchError(data.error);
            }
          }
        })
        .catch(function (error) {
          if (!didCancel) {
            console.log('Error : ', updatedUrl(), queryParams, error);
            setLoading(false);
            fetchError(API_FAILED);
          }
        });
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [page, keywords, queryParams, refreshing]);
  return [
    {loading, apiData, page, isLoadingMore, refreshing},
    {
      setPage,
      setData,
      setLoading,
      setKeywords,
      setQueryParams,
      setLoadingMore,
      setRefreshing,
    },
  ];
};

export const postDataApi = (
  url,
  payload,
  infoViewContext,
  isHideLoader = false,
) => {
  const {fetchStart, fetchSuccess, fetchError} = infoViewContext;
  return new Promise((resolve) => {
    console.log('Called: ', url, payload);
    if (!isHideLoader) fetchStart();
    jwtAxios
      .post(url, payload)
      .then(({data}) => {
        if (isRequestSuccessful(data.status)) {
          console.log('Success: ', url, data.result);
          fetchSuccess();
          return resolve(data.result);
        } else {
          console.log('Failed: ', url, data);
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        console.log('Error: ', url, error);
        fetchError(API_FAILED);
      });
    return Promise.resolve();
  });
};

export const putDataApi = (
  url,
  payload,
  infoViewContext,
  isHideLoader = false,
) => {
  const {fetchStart, fetchSuccess, fetchError} = infoViewContext;
  return new Promise((resolve) => {
    console.log('Called: ', url, payload);
    if (!isHideLoader) fetchStart();
    jwtAxios
      .put(url, payload)
      .then(({data}) => {
        if (isRequestSuccessful(data.status)) {
          console.log('Success: ', url, data.result);
          fetchSuccess();
          return resolve(data.result);
        } else {
          console.log('Failed: ', url, data);
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        console.log('Error: ', url, error);
        fetchError(API_FAILED);
      });
    return Promise.resolve();
  });
};

export const getDataApi = (url, infoViewContext, isHideLoader = false) => {
  const {fetchStart, fetchSuccess, fetchError} = infoViewContext;
  return new Promise((resolve) => {
    console.log('Called: ', url, jwtAxios.defaults.headers.common);
    if (!isHideLoader) fetchStart();
    jwtAxios
      .get(url)
      .then(({data}) => {
        if (isRequestSuccessful(data.status)) {
          console.log('Success: ', url, data.result);
          fetchSuccess();
          return resolve(data.result);
        } else {
          console.log('Failed: ', url, data);
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        console.log('Error: ', url, error);
        fetchError(API_FAILED);
      });
    return Promise.resolve();
  });
};

export const deleteDataApi = (url, infoViewContext, isHideLoader = false) => {
  const {fetchStart, fetchSuccess, fetchError} = infoViewContext;
  return new Promise((resolve) => {
    console.log('Called: ', url);
    if (!isHideLoader) fetchStart();
    jwtAxios
      .delete(url)
      .then(({data}) => {
        if (isRequestSuccessful(data.status)) {
          console.log('Success: ', url, data.result);
          fetchSuccess();
          return resolve(data.result);
        } else {
          console.log('Failed: ', url, data);
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        console.log('Error: ', url, error);
        fetchError(API_FAILED);
      });
    return Promise.resolve();
  });
};
