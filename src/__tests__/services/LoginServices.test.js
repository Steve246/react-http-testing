import { fireEvent, render, screen } from "@testing-library/react";

import {loginService} from "../../services/LoginService";

import {SERVICE} from "../../shared/constants";

describe("login service", () => {

  let client;
  const mockDoPost = jest.fn()
  const mockDoGet = jest.fn()

  beforeAll(() => {
    const mockClient = jest.fn().mockReturnValue({
      doPost: mockDoPost,
      doGet: mockDoGet
    })

    client = mockClient()
  })


  test("Success Authenticate", () => {

    mockDoPost.mockResolvedValue("success");

    const service = loginService(client);

    // const client = jest.fn().mockReturnValue({
    //   doPost: mockDoPost,
    //   doGet: jest.fn()
    // });

   

    const response = await service.doAuthenticate( {
      userName: 'dummyUser',
      password: 'dummyPassword'
    })

    expect(mockDoPost).toHaveBeenCalledWith({
      url: SERVICE.LOGIN, data: {
        userName: 'dummyUser',
        password: 'dummyPassword'
      }
    })

    expect(response).toBe('success')


  });

  test("Failed Authenticate", () => {
    // const mockDoPost = jest.fn();

    mockDoPost.mockRejectedValue(new Error('error'));

    const service = loginService(client);

    // const client = jest.fn().mockReturnValue({
    //   doPost: mockDoPost,
    //   doGet: jest.fn()
    // });

    // const service = loginService(client());

    await expect(service.doAuthenticate( {})).rejects.toThrow('error')

  


  });
});
