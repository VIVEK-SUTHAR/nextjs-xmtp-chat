/**
 *
 * @param address
 * @returns Shorted Address 0x...45a
 */
const shortenAddress = (address: string): string => {
  if (!address) return "0X...000";
  return "0x.." + address.slice(address.length - 4, address.length);
};
export default shortenAddress;
